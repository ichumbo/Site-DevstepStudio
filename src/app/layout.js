import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import {Footer } from "@/components/footer";
import {ScrollProgressBar } from "@/modules/home/progressBar";
import CustomCursor from "@/components/CustomCursor";

const InterSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SyneSans = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});


export const metadata = {
  title: "DevStep | Transforme sua visão em realidade com nossos serviços de desenvolvimento web.",
  description: "Transforme sua visão em realidade com nossos serviços de desenvolvimento web.",
  icons: {
    icon: "/images/favicon.ico",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable} ${SyneSans.variable} antialiased overflow-x-hidden cursor-none`}
      >
        <CustomCursor />
        <ScrollProgressBar />
        <Header />
      <div className="z-0 w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
