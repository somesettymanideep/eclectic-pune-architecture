import { Link } from "@tanstack/react-router";

const MENU = [
  { label: "Expertise", active: true },
  { label: "Principal", active: false },
  { label: "Us", active: false },
  { label: "Impact", active: false },
  { label: "Reach", active: false },
  { label: "Buzz", active: false },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="flex items-start justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          className="block bg-foreground px-2.5 py-2 text-background shadow-lg shadow-black/40"
          aria-label="Moco Design Studio — home"
        >
          <span className="block font-display text-lg font-semibold leading-[0.95] tracking-[0.18em]">
            MO
            <br />
            CO
          </span>
          <span className="mt-1 block text-[6px] font-medium uppercase tracking-[0.22em] opacity-70">
            design studio
          </span>
        </Link>

        <ul className="hidden items-center gap-6 pt-2 md:flex">
          {MENU.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`text-[11px] font-medium tracking-[0.14em] transition-colors duration-300 ${
                  item.active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu affordance */}
        <button
          type="button"
          aria-label="Open menu"
          className="mt-2 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </nav>
    </header>
  );
}
