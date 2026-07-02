import type { Metadata } from "next";
import { ThankYouPage } from "@/components/conversion/thank-you-page";

export const metadata: Metadata = {
  title: "Your enquiry is in",
  robots: { index: false, follow: false },
};

export default function ThankYouQuotePage() {
  return (
    <ThankYouPage
      journey="quote"
      waCode="WEB-QUOTE"
      title="Your enquiry is in. Quote within 48 working hours."
      body="Our engineer will call you within one working day to confirm your specification, then your quotation follows within 48 working hours."
    />
  );
}
