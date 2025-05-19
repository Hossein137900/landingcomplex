import Navbar from "@/components/global/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Footer from "@/components/global/footer";
import { LanguageProvider } from "@/context/languageContext";

// Initialize the Vazirmatn font
const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "سایکو - ساخت وب‌سایت حرفه‌ای در چند دقیقه",
  description:
    "با استفاده از ابزار هوشمند ما، در کمترین زمان وب‌سایت حرفه‌ای خود را بسازید. بدون نیاز به دانش برنامه‌نویسی!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>وب‌ساز - ساخت وب‌سایت حرفه‌ای در چند دقیقه</title>
      </head>
      <body className={vazir.className}>
        {" "}
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
