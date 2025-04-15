import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Lexend } from "next/font/google";
import { Roboto } from "next/font/google";

// Configuração da fonte Lexend do Google Fonts
const mainFontFamily = Roboto({
  weight: ["300", "700"],
  subsets: ["latin"],
});

// Metadados
export const metadata: Metadata = {
  title: "Central da Solidariedade",
  description: "Central da Solidariedade",
};

// Layout principal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mainFontFamily.className} antialiased w-full h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
