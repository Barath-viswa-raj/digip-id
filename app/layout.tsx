import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiP&ID - Transform Industrial Diagrams with AI",
  description: "AI-powered industrial diagram intelligence that transforms legacy P&ID drawings into machine-readable JSON for Industry 4.0 integration.",
  keywords: ["P&ID", "AI", "Industrial", "Engineering", "Digital Transformation", "OCR", "Computer Vision"],
  authors: [{ name: "DigiP&ID Team" }],
  openGraph: {
    title: "DigiP&ID - From Static P&ID to Machine-Ready JSON",
    description: "AI-powered industrial diagram intelligence that transforms legacy engineering drawings into smart digital assets.",
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
