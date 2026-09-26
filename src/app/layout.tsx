import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/layout/footer";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SARASWAT MISHRA",
  description:
    "The living digital archive of Saraswat Mishra. Wanderer. Biker. Observer.",
  keywords: ["Saraswat Mishra", "Living Archive", "Biker", "Wanderer", "Observer"],
  openGraph: {
    title: "SARASWAT MISHRA",
    description: "Don't explain who you are — let them find out, one road at a time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0b0a] text-[#f5f3ef] font-sans selection:bg-[#2b2723] selection:text-[#f5f3ef]">
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] bg-[#f5f3ef] px-4 py-3 text-sm text-[#0c0b0a] focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4a482]">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 w-full pt-24 md:pt-28 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
