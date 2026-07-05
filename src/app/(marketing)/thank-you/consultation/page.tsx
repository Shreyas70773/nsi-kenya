import type { Metadata } from "next";
import { ThankYouPage } from "@/components/conversion/thank-you-page";

export const metadata: Metadata = {
  title: "Consultation request received",
  description:
    "Consultation request received. We call within one working day to schedule your 30-minute working session.",
  robots: { index: false, follow: false },
};

export default function ThankYouConsultationPage() {
  return (
    <ThankYouPage
      journey="consultation"
      waCode="WEB-CONSULT"
      title="Consultation request received."
      body="We will call within one working day to schedule."
    />
  );
}
