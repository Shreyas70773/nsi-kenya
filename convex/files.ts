import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

/**
 * Convex File Storage actions for case-study photos, IoT screenshots,
 * spec-sheet PDFs, and other admin-uploaded assets.
 *
 * Upload flow (browser → Convex direct):
 *   1. Client (admin UI) calls `generateUploadUrl` → receives short-lived URL
 *   2. Client PUTs the file bytes to that URL
 *   3. Client receives a `storageId` back, then calls `registerAsset` to
 *      record metadata in the `mediaAssets` table
 *   4. UI reads back via `getAssetUrl({ storageId })`
 *
 * The plain upload URL endpoints are marked mutations so they require an
 * authenticated request from the admin client. Tightening to require an admin
 * identity check lands in Task 0.13 / Phase 3.
 */

/** Returns a short-lived signed URL the admin client uses to PUT the file. */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // TODO Phase 3: assert ctx.auth.getUserIdentity() resolves to an admin
    //              token issued by NextAuth (via convex/auth.config.ts).
    return await ctx.storage.generateUploadUrl();
  },
});

/** Returns the public read URL for a previously uploaded asset, or null. */
export const getAssetUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

/** Registers a freshly uploaded file in the mediaAssets metadata table. */
export const registerAsset = mutation({
  args: {
    storageId: v.id("_storage"),
    kind: v.union(
      v.literal("image"),
      v.literal("pdf"),
      v.literal("video"),
    ),
    filename: v.string(),
    altText: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
    contentType: v.optional(v.string()),
    tag: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mediaAssets", args);
  },
});

/** Admin: delete an asset (both the bytes and the metadata row). */
export const deleteAssetInternal = internalMutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("mediaAssets")
      .withIndex("by_storageId", (q) => q.eq("storageId", args.storageId))
      .unique();
    if (row) {
      await ctx.db.delete(row._id);
    }
    await ctx.storage.delete(args.storageId);
    return { deleted: true };
  },
});
