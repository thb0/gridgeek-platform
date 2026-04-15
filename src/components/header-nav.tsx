import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/customers", label: "Customers" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/sites", label: "Sites" },
  { href: "/quotes/dno", label: "DNO Quotes" },
  { href: "/tenders/idno", label: "IDNO Tenders" },
  { href: "/tenders/icp", label: "ICP Tenders" },
  { href: "/comparison", label: "Comparison" },
  { href: "/settings/company", label: "Settings" }
];

export function HeaderNav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container flex-column flex-lg-row align-items-start align-items-lg-center gap-2 py-2">
          <Link className="navbar-brand fw-semibold" href="/">
            GridGeek
          </Link>
          <div className="navbar-nav flex-row flex-wrap gap-1 small">
            {navLinks.map((link) => (
              <Link key={link.href} className="nav-link px-2" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
