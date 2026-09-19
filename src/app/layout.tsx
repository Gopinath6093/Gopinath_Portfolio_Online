import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import { LayoutProvider } from "@/components/portfolio/layout-provider";
import { FramerProvider } from "@/components/portfolio/framer-provider";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gopinath S | Futuristic Portfolio",
  description:
    "Immersive product-style portfolio with cinematic storytelling, quality engineering journey, and interactive 3D experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#03040b] text-white">
        <LayoutProvider>
          <FramerProvider>
            {children}
          </FramerProvider>
        </LayoutProvider>
      </body>
    </html>
  );
}
