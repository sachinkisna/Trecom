import type { MetadataRoute } from "next";
import { properties, projects, locations, services } from "@/lib/data";
import { posts as blogPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE = "https://trecom.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "about",
    "contact",
    "properties",
    "projects",
    "locations",
    "services",
    "blog",
    "sell-property",
    "post-property",
    "login",
    "privacy",
    "terms",
  ].map((path) => ({
    url: `${BASE}/${path}${path ? "/" : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyPages = properties.map((p) => ({
    url: `${BASE}/properties/${p.id}/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const projectPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const locationPages = locations.map((l) => ({
    url: `${BASE}/locations/${l.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: `${BASE}/services/${s.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = blogPosts.map((b) => ({
    url: `${BASE}/blog/${b.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...propertyPages,
    ...projectPages,
    ...locationPages,
    ...servicePages,
    ...blogPages,
  ];
}
