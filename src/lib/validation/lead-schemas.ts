import { z } from "zod";
import { phoneSchema } from "./phone";

/**
 * Shared lead-form schemas (extracted from the server actions so tests and
 * both actions agree on one source of truth — "use server" modules can only
 * export functions).
 *
 * F-3 contract: ≤5 required fields per journey.
 *   Quote:              name, phone, company, sector, requirement (≥1 group)
 *   Consultation/Audit: name, phone, company, sector, topic
 *   Contact:            name, phone, company, sector
 */

/** F-2: six grouped requirement options — detail is qualified by phone. */
export const PRODUCT_GROUP_VALUES = [
  "tanks",
  "silos",
  "structural-fabrication",
  "process-instrumentation",
  "remote-monitoring",
  "not-sure",
] as const;

export const PRODUCT_GROUPS: ReadonlyArray<{
  value: (typeof PRODUCT_GROUP_VALUES)[number];
  label: string;
}> = [
  { value: "tanks", label: "Tanks (stainless / lined / zinc-alum)" },
  { value: "silos", label: "Silos (grain / feed / industrial)" },
  { value: "structural-fabrication", label: "Structural fabrication" },
  { value: "process-instrumentation", label: "Process instrumentation" },
  { value: "remote-monitoring", label: "Remote monitoring" },
  { value: "not-sure", label: "Not sure — advise me" },
];

/** F-3: optional capacity bands (stored as the literal label). */
export const CAPACITY_OPTIONS = [
  "Under 10 m³",
  "10–100 m³",
  "Over 100 m³",
  "Silo 10–1,000 MT",
  "Not sure",
] as const;

const SECTOR = z.string().min(1, "Pick your sector").max(80);
const EMAIL_OPTIONAL = z
  .string()
  .email("Enter a valid email")
  .optional()
  .or(z.literal(""));

export const QUOTE_SCHEMA = z.object({
  intent: z.enum(["explore", "evaluate", "purchase", "urgent-etp"]),
  name: z.string().min(1, "Required").max(120),
  phone: phoneSchema,
  company: z.string().min(1, "Required").max(160),
  industry: SECTOR,
  productSlugs: z
    .array(z.enum(PRODUCT_GROUP_VALUES))
    .min(1, "Tick at least one — or 'Not sure'")
    .max(PRODUCT_GROUP_VALUES.length),
  capacity: z.string().max(40).optional().or(z.literal("")),
  email: EMAIL_OPTIONAL,
  message: z.string().max(4000).optional().or(z.literal("")),
});

export const INQUIRY_SCHEMA = z
  .object({
    kind: z.enum(["contact", "consultation", "site-audit"]),
    name: z.string().min(1, "Required").max(120),
    phone: phoneSchema,
    company: z.string().min(1, "Required").max(160),
    industry: SECTOR,
    topic: z.string().max(200).optional().or(z.literal("")),
    siteLocation: z.string().max(200).optional().or(z.literal("")),
    capacity: z.string().max(40).optional().or(z.literal("")),
    email: EMAIL_OPTIONAL,
    message: z.string().max(4000).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    // F-3: "Requirement*" — for these journeys the topic field is the
    // requirement; plain contact keeps it optional.
    if (
      (data.kind === "consultation" || data.kind === "site-audit") &&
      !data.topic?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["topic"],
        message: "Required",
      });
    }
  });
