import type { Metadata } from "next";
import { ThankYouPage } from "@/components/conversion/thank-you-page";

export const metadata: Metadata = {
  title: "Audit request received",
  description:
    "Site-audit request received. Our engineer calls within one working day to fix a date; the audit is free with a written technical brief.",
  robots: { index: false, follow: false },
};

export default function ThankYouSiteAuditPage() {
  return (
    <ThankYouPage
      journey="site_audit"
      waCode="WEB-AUDIT"
      title="Audit request received."
      body="Our engineer will call within one working day to fix a date. The audit is free and you receive a written technical brief."
    />
  );
}
