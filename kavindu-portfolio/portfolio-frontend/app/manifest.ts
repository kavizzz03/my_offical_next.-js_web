import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kavindu Bogahawatte, Independent Software Engineer",
    short_name: "Kavindu",
    description: "Reliable REST APIs, backend systems, full-stack web and native Android apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFD",
    theme_color: "#5B4BFF",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
