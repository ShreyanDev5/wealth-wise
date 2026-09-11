import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-plus-jakarta-sans' });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair-display' });

export const metadata: Metadata = {
  metadataBase: new URL("https://wealth-wise.vercel.app"),
  title: {
    default: "WealthWise — Financial Advisory | Monotosh Sardar",
    template: "%s | WealthWise",
  },
  description: "Personalized financial planning, insurance portfolios, disciplined mutual funds, and document services with 19+ years of trusted advisory in Kolkata & West Bengal.",
  keywords: [
    "Financial Advisor Kolkata",
    "Monotosh Sardar",
    "WealthWise",
    "Mutual Funds SIP",
    "Health Insurance Kolkata",
    "Life Insurance LIC",
    "ITR Filing Kolkata",
    "Financial Planner West Bengal",
  ],
  authors: [{ name: "Monotosh Sardar" }],
  creator: "Monotosh Sardar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wealth-wise.vercel.app",
    siteName: "WealthWise Financial Advisory",
    title: "WealthWise — Financial Advisory | Monotosh Sardar",
    description: "Personalized financial planning, insurance portfolios, disciplined mutual funds, and document services with 19+ years of trusted advisory in Kolkata.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "WealthWise Financial Advisory Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "WealthWise — Financial Advisory | Monotosh Sardar",
    description: "Personalized financial planning, insurance portfolios, and mutual funds with 19+ years of trusted advisory in Kolkata.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}