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
    image: "https://images.unsplash.com/photo-HgMNER_JMts?w=800&q=80&fit=crop",
  },
  {
    slug: "entretien-velo-colombes",
    title: "Comment entretenir son vélo à Colombes : 7 gestes simples pour durer",
    excerpt:
      "Quelques gestes réguliers suffisent à prolonger la vie de votre vélo. Voici ceux que notre atelier recommande.",
    date: "10 mars 2026",
    dateISO: "2026-03-10",
    image: "https://images.unsplash.com/photo-_x1bEIi99GI?w=800&q=80&fit=crop",
  },
  {
    slug: "pistes-cyclables-colombes-hauts-de-seine",
    title: "Pistes cyclables à Colombes et autour : nos itinéraires favoris",
    excerpt:
      "De Colombes à Bois-Colombes, Asnières ou La Défense : les meilleurs trajets à vélo testés par l'équipe.",
    date: "5 mars 2026",
    dateISO: "2026-03-05",
    image: "https://images.unsplash.com/photo-bYGTxSn06C0?w=800&q=80&fit=crop",
  },
  {
    slug: "revision-velo-professionnel",
    title: "Révision de vélo : quand et pourquoi confier son vélo à un professionnel",
    excerpt:
      "Les signes qui montrent qu'il est temps de passer à l'atelier. Et ce que change une vraie révision.",
    date: "1 mars 2026",
    dateISO: "2026-03-01",
    image: "https://images.unsplash.com/photo-GNSIOmiBFaY?w=800&q=80&fit=crop",
  },
];
