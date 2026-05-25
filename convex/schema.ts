/**
 * Convex schema for North Star Impex Kenya.
 *
 * Tables backing the Phase 3 admin surface (case studies, blog, media, quote
 * requests, reference-call requests, admin users). The marketing site (Phase 1)
 * reads `caseStudies` and `blogPosts`; conversion routes (Phase 1) write
 * `quoteRequests` and `referenceCallRequests`; admin CRUD (Phase 3) manages
 * everything.
 *
 * Refer to convex/_generated/ai/guidelines.md before touching this file —
 * it overrides general Convex knowledge.
 */

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // -----------------------------------------------------------------------
  // Admin users — single-admin model at launch. Password-hash auth via
  // NextAuth Credentials provider; this row is read inside the authorize()
  // callback. See src/lib/auth.ts.
  // -----------------------------------------------------------------------
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    role: v.union(v.literal("admin"), v.literal("editor")),
    name: v.optional(v.string()),
  }).index("by_email", ["email"]),

  // -----------------------------------------------------------------------
  // Case studies — Crywan is seeded in the content-map; additional rows are
  // added via /admin/case-studies/ once Phase 3 ships.
  // -----------------------------------------------------------------------
  caseStudies: defineTable({
    slug: v.string(),
    clientName: v.string(),
    country: v.string(),
    industry: v.string(),                        // matches INDUSTRIES slug
    productsInstalled: v.array(v.string()),      // matches PRODUCTS slugs
    brief: v.optional(v.string()),
    solution: v.optional(v.string()),
    outcome: v.optional(v.string()),
    pullQuote: v.optional(v.string()),
    pullQuoteAttribution: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    galleryStorageIds: v.array(v.id("_storage")),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),         // epoch ms
  })
    .index("by_slug", ["slug"])
    .index("by_published_and_publishedAt", ["published", "publishedAt"])
    .index("by_industry", ["industry"]),

  // -----------------------------------------------------------------------
  // Blog posts.
  // -----------------------------------------------------------------------
  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.optional(v.string()),
    body: v.string(),                            // markdown / MDX source
    coverImageStorageId: v.optional(v.id("_storage")),
    tags: v.array(v.string()),
    authorId: v.optional(v.id("users")),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published_and_publishedAt", ["published", "publishedAt"]),

  // -----------------------------------------------------------------------
  // Media assets — image and PDF references (spec sheets, IoT screenshots,
  // plant photos). Bytes live in Convex File Storage; this table tracks
  // metadata used by the admin media library.
  // -----------------------------------------------------------------------
  mediaAssets: defineTable({
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
    uploadedBy: v.optional(v.id("users")),
    /** Logical bucket for filtering the admin library, e.g. "case-study",
     *  "iot-screenshot", "spec-sheet", "team", "plant". */
    tag: v.optional(v.string()),
  })
    .index("by_storageId", ["storageId"])
    .index("by_tag", ["tag"]),

  // -----------------------------------------------------------------------
  // Quote requests — written by the public /request-quote/ handlers.
  // -----------------------------------------------------------------------
  quoteRequests: defineTable({
    intent: v.union(
      v.literal("explore"),
      v.literal("evaluate"),
      v.literal("purchase"),
      v.literal("urgent-etp"),
    ),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    industry: v.optional(v.string()),
    productSlugs: v.array(v.string()),
    message: v.optional(v.string()),
    /** UTM + referrer captured client-side for attribution. */
    metadata: v.optional(
      v.object({
        referrer: v.optional(v.string()),
        utmSource: v.optional(v.string()),
        utmMedium: v.optional(v.string()),
        utmCampaign: v.optional(v.string()),
        userAgent: v.optional(v.string()),
      }),
    ),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("won"),
      v.literal("lost"),
    ),
  })
    .index("by_status_and_creation", ["status"])
    .index("by_intent", ["intent"])
    .index("by_email", ["email"]),

  // -----------------------------------------------------------------------
  // Reference-call requests — the /talk-to-a-customer/ trust-gate handler.
  // -----------------------------------------------------------------------
  referenceCallRequests: defineTable({
    name: v.string(),
    company: v.string(),
    email: v.string(),
    industry: v.optional(v.string()),
    considering: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("contacted"),
      v.literal("completed"),
    ),
    contactedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),
});
