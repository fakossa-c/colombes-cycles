import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.colombes-cycles.fr";

  return [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" },
    { url: `${baseUrl}/nos-velos`, priority: 0.9, changeFrequency: "weekly" },
    {
      url: `${baseUrl}/nos-velos/velos-de-ville`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/velos-electriques`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { url: `${baseUrl}/nos-velos/vtt`, priority: 0.7, changeFrequency: "monthly" },
    {
      url: `${baseUrl}/nos-velos/velos-enfants`,
      priority: 0.7,
      changeFrequency: "monthly",
    },
    {
      url: `${baseUrl}/nos-velos/accessoires`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    { url: `${baseUrl}/reparations`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${baseUrl}/a-propos`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "yearly" },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" },
  ];
}
