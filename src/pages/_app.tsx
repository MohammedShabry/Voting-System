import "@/styles/globals.css";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../../next-i18next.config.js";
import { UserConfig } from "next-i18next";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

// Declare gtag function on the window object
declare global {
  interface Window {
    gtag: (command: string, id: string, config?: Record<string, unknown>) => void;
  }
}

const emptyInitialI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
    locales: nextI18NextConfig.i18n.locales,
  },
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let startTime: number;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const timeSpent = Date.now() - startTime; // Calculate time spent on the previous page
      window.gtag("event", "time_on_page", {
        event_category: "engagement",
        event_label: url,
        value: timeSpent,
      });

      // Track page view
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "G-Y8QX8C658S", {
        page_path: url,
      });

      // Track navigation pattern
      window.gtag("event", "navigation", {
        event_category: "Navigation",
        event_label: `From ${router.asPath} to ${url}`,
      });

      // Reset start time for the new page
      startTime = Date.now();
    };

    // Initialize start time
    startTime = Date.now();

    // Track initial page load
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "G-Y8QX8C658S", {
      page_path: router.asPath,
    });

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Warn if GA ID is not set
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    console.warn("Google Analytics ID (NEXT_PUBLIC_GA_ID) is not set.");
  }

  return (
    <>
      {/* Google Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-Y8QX8C658S"}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-Y8QX8C658S"}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              custom_map: {
                dimension1: 'age',
                dimension2: 'gender',
                dimension3: 'location',
                dimension4: 'device',
                dimension5: 'browser'
              }
            });
          `,
        }}
      />
      {/* Main Application Component */}
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App, emptyInitialI18NextConfig);
