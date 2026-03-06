export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  image: string;
};

export const articles: BlogArticle[] = [
  {
    slug: "guide-velo-electrique-colombes",
    title: "Vélo électrique à Colombes : notre guide complet pour choisir votre VAE",
    excerpt:
      "Ville, cargo, VTT électrique : comment choisir le bon VAE pour vos trajets en Île-de-France. On vous aide à y voir clair.",
    date: "15 mars 2026",
    dateISO: "2026-03-15",
    image: "https://images.unsplash.com/photo-1620802051782-725fa33db067?w=800&q=80&fit=crop&auto=format",
  },
  {
    slug: "entretien-velo-colombes",
    title: "Comment entretenir son vélo à Colombes : 7 gestes simples pour durer",
    excerpt:
      "Quelques gestes réguliers suffisent à prolonger la vie de votre vélo. Voici ceux que notre atelier recommande.",
    date: "10 mars 2026",
    dateISO: "2026-03-10",
    image: "https://images.unsplash.com/photo-1607109181641-74f8e7f4eb11?w=800&q=80&fit=crop&auto=format",
  },
  {
    slug: "pistes-cyclables-colombes-hauts-de-seine",
    title: "Pistes cyclables à Colombes et autour : nos itinéraires favoris",
    excerpt:
      "De Colombes à Bois-Colombes, Asnières ou La Défense : les meilleurs trajets à vélo testés par l'équipe.",
    date: "5 mars 2026",
    dateISO: "2026-03-05",
    image: "https://images.unsplash.com/photo-1602517232715-c4a366f0ce1b?w=800&q=80&fit=crop&auto=format",
  },
  {
    slug: "revision-velo-professionnel",
    title: "Révision de vélo : quand et pourquoi confier son vélo à un professionnel",
    excerpt:
      "Les signes qui montrent qu'il est temps de passer à l'atelier. Et ce que change une vraie révision.",
    date: "1 mars 2026",
    dateISO: "2026-03-01",
    image: "https://images.unsplash.com/photo-1562615193-cbeef074a501?w=800&q=80&fit=crop&auto=format",
  },
];
