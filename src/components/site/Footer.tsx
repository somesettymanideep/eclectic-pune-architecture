import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <p className="text-[11px] tracking-wide text-muted-foreground">
          © Copyright Moco Design Studio 2026
        </p>
        <div className="flex items-center gap-2.5">
          {SOCIALS.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Icon size={14} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
