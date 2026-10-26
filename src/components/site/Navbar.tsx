import { Link } from "@tanstack/react-router";
import seaLogo from "@/assets/sea-logo-exact.png.asset.json";
import { mediaUrl } from "@/lib/media-url";

const MENU = [
  { label: "About", active: false },
  { label: "Services", active: false },
  { label: "Portfolio", active: true },
  { label: "Contact", active: false },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* translucent scrim so the logo and menu stay readable over the video */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 via-background/30 to-transparent" />

      <nav className="relative flex items-center justify-between px-5 py-3 md:px-8">
        <Link
          to="/"
          className="block"
          aria-label="SEA — Studio for Eclectic Architecture — home"
        >
          <img
            src={mediaUrl(seaLogo)}
            alt="SEA — Studio for Eclectic Architecture"
            className="h-12 w-auto md:h-16"
            width={500}
            height={211}
          />
        </Link>

        <ul className="hidden items-center gap-8 pt-2 md:flex">
          {MENU.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
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
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </nav>
    </header>
  );
}
