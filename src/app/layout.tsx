import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";

export const metadata: Metadata = {
  title: "Stadium Copilot 2026 – FIFA World Cup AI Assistant",
  description: "A GenAI-powered fan assistant for the FIFA World Cup 2026. Navigate stadiums, find amenities, multilingual support, and real-time operational intelligence across 16 cities in 3 countries.",
  keywords: "FIFA World Cup 2026, stadium assistant, AI, navigation, multilingual, accessibility, sustainability, crowd management, operational intelligence",
  authors: [{ name: "Stadium Copilot Team" }],
  openGraph: {
    title: "Stadium Copilot 2026 – FIFA World Cup AI Assistant",
    description: "AI-powered fan assistant for FIFA World Cup 2026 across 16 cities in 3 countries.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" dir="ltr">
      <head>
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-blue-600 focus:ring-2 focus:ring-blue-500">
          Skip to main content
        </a>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
