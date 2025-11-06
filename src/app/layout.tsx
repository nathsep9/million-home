import { I18nProvider } from "@/i18n/I18nProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MswInitializer from "./MswInitializer";

import ThemeRegistry from "./theme/ThemeRegistry";
import Header from "./components/Header";

import "@/app/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Million Homes - Encuentra tu hogar ideal",
  description: "Descubre las mejores propiedades para comprar o alquilar en Million Homes. Tu hogar ideal te espera.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeRegistry>
          <I18nProvider>
            <MswInitializer />
            <Header />
            {children}
          </I18nProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
