import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import seaLogo from "@/assets/sea-logo-exact.png.asset.json";
import { mediaUrl } from "@/lib/media-url";

const MENU = [
  { label: "Home", active: true },
  { label: "About", active: false },
  { label: "Services", active: false },
  { label: "Portfolio", active: false },
  { label: "Contact", active: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      {/* translucent scrim only while at the very top, so the logo and menu
          stay readable over the video; the light theme keeps the header fully
          transparent there and uses the fixed media-token menu colours */}
      <div
        className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 via-background/30 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100 light:opacity-0"
        }`}
      />

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
                  scrolled
                    ? item.active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                    : item.active
                      ? "text-media-foreground"
                      : "text-media-foreground/60 hover:text-media-foreground"
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
          <span
            className={`h-px w-6 transition-colors duration-300 ${
              scrolled ? "bg-foreground" : "bg-media-foreground"
            }`}
          />
          <span
            className={`h-px w-6 transition-colors duration-300 ${
              scrolled ? "bg-foreground" : "bg-media-foreground"
            }`}
          />
        </button>
      </nav>
    </header>
  );
}
