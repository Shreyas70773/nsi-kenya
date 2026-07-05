import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * The wildcard rule already permits AI crawlers, but each answer-engine and
 * training bot is listed explicitly so citation intent is unambiguous and
 * survives any future tightening of the `*` rule. Disallows mirror the
 * non-public surfaces (admin, api, quote-success).
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "MistralAI-User",
];

const DISALLOW = [
  "/admin/",
  "/api/",
  "/request-quote/success/",
  "/thank-you/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
