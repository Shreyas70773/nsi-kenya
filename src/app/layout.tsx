import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationLd } from "@/lib/seo";
import { Gtm } from "@/components/analytics/gtm";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageFade } from "@/components/motion/page-fade";
import { ExperienceProvider } from "@/components/experience/experience-context";
import { IntroSequence } from "@/components/experience/intro-sequence";

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

/* Display voice of the redesign: Archivo variable with its width axis, so
   headlines can run from condensed numerals to wide statement cuts. */
const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/images/home/hero-tank-farm.png" }],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#d40000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-KE"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-accent/20 selection:text-text">
        <Gtm />
        <JsonLd data={organizationLd()} />
        <ExperienceProvider>
          <IntroSequence />
          <SmoothScroll>
            <PageFade>{children}</PageFade>
          </SmoothScroll>
        </ExperienceProvider>
      </body>
    </html>
  );
}
