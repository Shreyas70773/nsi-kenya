"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

/**
 * F-7 invisible spam protection, form side. Renders:
 *  - a honeypot text input (company_website) real users never see or fill;
 *  - the render timestamp (bots submit faster than humans can type);
 *  - a reCAPTCHA v3 token, refreshed on a timer because tokens expire in
 *    2 minutes and industrial buyers type slowly. Script loads only when
 *    the site key is configured — zero third-party bytes otherwise.
 * No visible challenge anywhere (every extra click costs mobile leads).
 */
export function SpamFields({ action }: { action: string }) {
  const [renderedAt, setRenderedAt] = useState(0);
  const [token, setToken] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const refreshToken = () => {
    const grecaptcha = (
      window as Window & { grecaptcha?: Grecaptcha }
    ).grecaptcha;
    if (!grecaptcha) return;
    grecaptcha.ready(() => {
      grecaptcha
        .execute(SITE_KEY, { action })
        .then(setToken)
        .catch(() => {});
    });
  };

  return (
    <>
      {/* Honeypot: hidden from real users and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <input type="hidden" name="rendered_at" value={renderedAt} />
      {SITE_KEY ? (
        <>
          <input type="hidden" name="recaptcha_token" value={token} />
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
            strategy="lazyOnload"
            onLoad={() => {
              refreshToken();
              timer.current = setInterval(refreshToken, 105_000);
            }}
          />
        </>
      ) : null}
    </>
  );
}
