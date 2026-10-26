import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/use-lenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ProjectsHorizontal } from "@/components/site/ProjectsHorizontal";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";
import heroPoster from "@/assets/videos/vija-hero-poster.jpg.asset.json";
import { mediaUrl } from "@/lib/media-url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "best Architecture company in vijayawada",
      },
      {
        name: "description",
        content:
          "Studio for Eclectic Architecture is a dynamic firm offering architecture, interiors and landscape design solutions across residential, commercial, villas, apartments, layouts and resorts.",
      },
      {
        property: "og:title",
        content: "best Architecture company in vijayawada",
      },
      {
        property: "og:description",
        content:
          "Studio for Eclectic Architecture — architecture, interiors and landscape design solutions tailored to every project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: mediaUrl(heroPoster) },
      { name: "twitter:image", content: mediaUrl(heroPoster) },
      {
        name: "twitter:title",
        content: "best Architecture company in vijayawada",
      },
      {
        name: "twitter:description",
        content:
          "Studio for Eclectic Architecture — architecture, interiors and landscape design solutions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProjectsHorizontal />
        <About />
        <Services />
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
}
