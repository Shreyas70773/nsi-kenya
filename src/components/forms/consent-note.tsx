import Link from "next/link";

/**
 * F-4 consent microcopy — sits under every submit button, links to the
 * privacy policy. Copy is contractual (brief §6); do not reword.
 */
export function ConsentNote() {
  return (
    <p className="text-xs leading-relaxed text-faint">
      By submitting, you agree to be contacted by North Star Impex about your
      enquiry. We never share your details. See our{" "}
      <Link href="/privacy/" className="underline underline-offset-2 hover:text-text">
        privacy policy
      </Link>
      .
    </p>
  );
}
