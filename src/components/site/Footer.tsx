import { Linkedin, Facebook, Instagram, Youtube, Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSiteTheme } from "@/hooks/use-site-theme";

const SOCIALS = [
  { label: "LinkedIn", icon: Linkedin },
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "YouTube", icon: Youtube },
];

export function Footer() {
  const { dark, changeTheme } = useSiteTheme();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 md:px-8">
        <p className="text-[11px] tracking-wide text-muted-foreground">
          © Copyright Studio for Eclectic Architecture 2026
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-2.5">
            <Sun size={15} className="text-muted-foreground" aria-hidden="true" />
            <Switch checked={dark} onCheckedChange={changeTheme} aria-label="Dark theme" />
            <Moon size={15} className="text-muted-foreground" aria-hidden="true" />
          </div>
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
          <p className="text-[11px] tracking-wide text-muted-foreground">
            Designed and developed by{" "}
            <span className="text-foreground">Ayrondigitalsolutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
