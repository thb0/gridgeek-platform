import Link from "next/link";

export function HeaderNav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-semibold" href="/">
            GridGeek
          </Link>
          <div className="navbar-nav flex-row gap-3">
            <Link className="nav-link" href="/">
              Home
            </Link>
            <Link className="nav-link" href="/login">
              Login
            </Link>
            <Link className="nav-link" href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
