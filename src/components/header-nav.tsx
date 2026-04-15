"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { WorkingStyle } from "@/lib/platform-data";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" }
] as const;

const customerLink = { href: "/customers", label: "Customers" } as const;
const siteLink = { href: "/sites", label: "Sites" } as const;

const trailingNavLinks = [
  { href: "/suppliers", label: "Suppliers" },
  { href: "/quotes/dno", label: "DNO Quotes" },
  { href: "/tenders/idno", label: "IDNO Tenders" },
  { href: "/tenders/icp", label: "ICP Tenders" },
  { href: "/comparison", label: "Comparison" },
  { href: "/settings/company", label: "Settings" }
 ] as const;

type HeaderNavProps = {
  workingStyle?: WorkingStyle | null;
};

export function HeaderNav({ workingStyle }: HeaderNavProps) {
  const pathname = usePathname();
  const navLinks = [
    ...baseNavLinks,
    ...getWorkflowLinks(workingStyle ?? "customer_first"),
    ...trailingNavLinks
  ];

  return (
    <header className="app-header sticky-top">
      <nav className="container py-3 py-lg-4">
        <div className="app-nav-shell">
          <div className="app-nav-top">
            <Link className="app-brand" href="/">
              <span className="app-brand-mark">GG</span>
              <span>
                <span className="app-brand-name">GridGeek Platform</span>
                <span className="app-brand-subtitle">Connections commercial tracker, in the lighter GridGeek style.</span>
              </span>
            </Link>
            <div className="app-mode-pill">Light</div>
          </div>
          <div className="app-nav-links">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  className={`app-nav-link${isActive ? " active" : ""}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

function getWorkflowLinks(workingStyle: WorkingStyle) {
  return workingStyle === "site_first" ? [siteLink, customerLink] : [customerLink, siteLink];
}
