import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { HeaderNav } from "@/components/header-nav";

export const metadata: Metadata = {
  title: "GridGeek Platform",
  description: "Self-hosted platform scaffold for GridGeek"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light text-dark">
        <HeaderNav />
        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
