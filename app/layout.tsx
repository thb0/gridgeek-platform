import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { HeaderNav } from "@/components/header-nav";
import { getPrimaryOrganizationProfile } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "GridGeek Platform",
  description: "Self-hosted platform scaffold for GridGeek"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = await getPrimaryOrganizationProfile().catch(() => null);

  return (
    <html lang="en">
      <body className="app-shell">
        <HeaderNav workingStyle={organization?.workingStyle ?? null} />
        <main className="container py-4 py-lg-5">{children}</main>
        <footer className="app-footer">
          <div className="container d-flex flex-column flex-lg-row justify-content-between gap-2 py-4">
            <p className="mb-0">GridGeek Platform light mode for connection commercials.</p>
            <p className="mb-0">
              {organization?.workingStyle === "site_first"
                ? "Site-first workspace emphasis for DNO, IDNO, ICP, and civils."
                : "Customer-first workspace emphasis on top of the same site-centric backbone."}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
