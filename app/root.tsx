import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";

import type { Route } from "./+types/root";
import "./app.css";

const siteUrl = "https://it-mentor.in.ua";
const siteName = "IT-Mentor";
const siteDescription = "Курси веб-розробки: HTML, CSS, JavaScript, TypeScript, React та Next.js. Практичне навчання з менторською підтримкою від автора YouTube-каналу \"Навчаємося Разом\".";

export const meta: Route.MetaFunction = () => [
  { title: `${siteName} — Курси frontend` },
  { name: "description", content: siteDescription },
  { name: "keywords", content: "курси програмування, веб-розробка, HTML, CSS, JavaScript, TypeScript, React, Next.js, frontend, навчання, ментор, IT курси Україна" },
  { name: "author", content: "IT-Mentor" },
  { name: "theme-color", content: "#84cc16" },
  // Open Graph
  { property: "og:type", content: "website" },
  { property: "og:url", content: siteUrl },
  { property: "og:title", content: `${siteName} — Курси frontend` },
  { property: "og:description", content: siteDescription },
  { property: "og:image", content: `${siteUrl}/images/og-image.png` },
  { property: "og:site_name", content: siteName },
  { property: "og:locale", content: "uk_UA" },
  // Twitter Card
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:url", content: siteUrl },
  { name: "twitter:title", content: `${siteName} — Курси frontend` },
  { name: "twitter:description", content: siteDescription },
  { name: "twitter:image", content: `${siteUrl}/images/og-image.png` },
];

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "canonical", href: siteUrl },
];

import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { ThemeProvider, ThemeScript } from "~/components/ThemeProvider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-white">
        <Navbar />
        <main className="grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
