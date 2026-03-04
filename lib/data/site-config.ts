export const siteConfig = {
  name: "Colombes Cycles",
  url: "https://www.colombes-cycles.fr",
  phone: "01 42 42 66 02",
  phoneTel: "0142426602",
  address: {
    street: "12 Av. Henri Barbusse",
    city: "Colombes",
    postalCode: "92700",
    full: "12 Av. Henri Barbusse, 92700 Colombes",
  },
  geo: {
    latitude: 48.9234,
    longitude: 2.2528,
  },
  hours: {
    open: "Mardi - Samedi : 9h - 19h",
    closed: "Dimanche et Lundi : Fermé",
    days: [
      { day: "Lundi", open: false },
      { day: "Mardi", open: true, hours: "09:00-19:00" },
      { day: "Mercredi", open: true, hours: "09:00-19:00" },
      { day: "Jeudi", open: true, hours: "09:00-19:00" },
      { day: "Vendredi", open: true, hours: "09:00-19:00" },
      { day: "Samedi", open: true, hours: "09:00-19:00" },
      { day: "Dimanche", open: false },
    ],
  },
  google: {
    rating: 4.8,
    reviewCount: 271,
  },
  certifications: ["BOSCH eBike"],
  brands: ["Orbea", "Peugeot Cycles", "Gitane", "Velodeville", "Lombardo", "Sparta"],
  owner: "David Thibault",
} as const;
