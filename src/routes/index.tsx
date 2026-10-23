import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/hooks/use-lenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ProjectsHorizontal } from "@/components/site/ProjectsHorizontal";
import { About } from "@/components/site/About";
import { Spotlight } from "@/components/site/Spotlight";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Moco Design Studio — Changing the Cityscape of Pune",
      },
      {
        name: "description",
        content:
          "Moco Design Studio is an architecture practice changing the cityscape of Pune — IT parks, corporate campuses, high-end residences and educational institutions.",
      },
      {
        property: "og:title",
        content: "Moco Design Studio — Changing the Cityscape of Pune",
      },
      {
        property: "og:description",
        content:
          "Premium architecture studio in Pune. IT parks, corporate campuses, high-end residences and educational institutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Moco Design Studio" },
      {
        name: "twitter:description",
        content: "Changing the Cityscape of Pune since 2006.",
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
        <Spotlight />
      </main>
      <Footer />
    </div>
  );
}
