export type Category = {
  slug: string;
  title: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  angleConseil: string;
  breadcrumbLabel: string;
  brands: string[];
};

export const categories: Category[] = [
  {
    slug: "velos-de-ville",
    title: "Vélos de ville",
    pageTitle: "Vélos de ville. Pour rouler vraiment, tous les jours.",
    metaTitle: "Vélos de Ville à Colombes — Colombes Cycles",
    metaDescription:
      "Vélos urbains et de ville à Colombes. Large choix pour vos trajets quotidiens. Conseil personnalisé et essai en magasin. Livraison ou retrait 92700.",
    description:
      "Le vélo de ville doit tenir sur la durée. Résister aux pavés, à la pluie, aux arrêts brusques et aux années de trajet quotidien. On sélectionne des modèles robustes, bien équipés dès la sortie de boîte — garde-boue, éclairage, porte-bagages. Rien à rajouter pour rouler en sécurité.",
    angleConseil:
      "Vous cherchez un vélo pour aller au travail ou vous déplacer en ville ? Parlez-nous de votre trajet, de la distance, du terrain. On vous orientera vers le bon modèle — ni trop, ni pas assez.",
    breadcrumbLabel: "Vélos de ville",
    brands: ["Orbea", "Peugeot Cycles", "Gitane", "Velodeville"],
  },
  {
    slug: "velos-electriques",
    title: "Vélos électriques",
    pageTitle: "Vélos électriques. L'assistance qui change tout.",
    metaTitle: "Vélos Électriques & VAE à Colombes — BOSCH",
    metaDescription:
      "Vélos électriques et VAE à Colombes. Revendeur certifié BOSCH eBike. Essai, conseil et entretien sur place. Venez tester votre futur VAE !",
    description:
      "Le VAE n'est pas un gadget. C'est un outil qui réconcilie des milliers de gens avec le vélo — les côtes, les distances, les transports lourds. On est revendeur certifié BOSCH eBike : les moteurs qu'on vend sont fiables, les batteries durables, et surtout — on sait les entretenir sur le long terme. Vous ne serez pas seul le jour où quelque chose ne va pas.",
    angleConseil:
      "Usage quotidien, sorties le week-end, cargo pour les enfants ? Le bon VAE dépend de votre usage réel. Venez l'essayer avant d'acheter — c'est la seule façon de savoir.",
    breadcrumbLabel: "Vélos électriques",
    brands: ["Orbea", "BOSCH eBike Systems", "Peugeot Cycles"],
  },
  {
    slug: "vtt",
    title: "VTT",
    pageTitle: "VTT. Pour ceux qui veulent sortir des routes.",
    metaTitle: "VTT à Colombes — Colombes Cycles",
    metaDescription:
      "VTT et vélos tout-terrain à Colombes. Sélection rigoureuse pour trail et loisir. Conseil expert de David Thibault, 15 ans de pratique. Colombes 92.",
    description:
      "Le VTT de loisir, le trail du week-end, ou la sortie en forêt avec les enfants — on a ce qu'il faut. Des modèles rigides ou semi-rigides, pensés pour des pratiquants sérieux sans être des compétiteurs. On choisit des vélos qui encaissent sans rendre l'âme au premier sentier.",
    angleConseil:
      "Vous pratiquez comment ? Sur quels terrains ? Combien de fois par mois ? Les réponses changent tout. Un VTT d'entrée de gamme mal adapté, c'est de l'argent perdu. On prend le temps de bien cerner votre usage avant de vous proposer quoi que ce soit.",
    breadcrumbLabel: "VTT",
    brands: ["Orbea", "Peugeot Cycles"],
  },
  {
    slug: "velos-enfants",
    title: "Vélos enfants",
    pageTitle: "Vélos enfants. Le bon vélo au bon moment.",
    metaTitle: "Vélos Enfants à Colombes — Colombes Cycles",
    metaDescription:
      "Vélos pour enfants à Colombes : draisienne, 12, 16, 20 pouces et plus. Sécurité et qualité garanties. Conseil pour choisir le bon vélo selon l'âge.",
    description:
      "Le vélo de l'enfance, c'est souvent le premier souvenir de liberté. Il doit être sûr, à la bonne taille, pas trop lourd pour les petites jambes. On propose des vélos qui grandissent avec l'enfant — draisienne pour les tout-petits, premiers pédales, puis des modèles solides pour les 8-12 ans. Pas de plastique fragile. Des vélos qui tiennent.",
    angleConseil:
      "La règle d'or : l'enfant doit poser les pieds à plat quand il est en selle. Apportez-le avec vous. On l'essaiera, on réglera la hauteur de selle, et il repartira avec quelque chose qui lui va vraiment.",
    breadcrumbLabel: "Vélos enfants",
    brands: ["Peugeot Cycles", "Gitane"],
  },
  {
    slug: "accessoires",
    title: "Accessoires",
    pageTitle: "Accessoires. Ce qui fait la différence sur la route.",
    metaTitle: "Accessoires Vélo à Colombes — Colombes Cycles",
    metaDescription:
      "Casques, antivols, éclairages, sacoches… Tous les accessoires vélo à Colombes. Marques sélectionnées pour votre sécurité et votre confort.",
    description:
      "Casque, antivol, éclairage, sacoche, sonnette, pompe — on stocke l'essentiel. Des marques sélectionnées pour leur fiabilité, pas pour leur packaging. Un antivol qui ne résiste pas, c'est un vélo volé. Un casque bas de gamme mal ajusté, ça ne protège pas vraiment. On n'accepte pas les produits qui nous font douter.",
    angleConseil:
      "Un doute sur quel antivol choisir ? Vous cherchez un casque adapté à votre usage ? Demandez-nous. On a un avis clair.",
    breadcrumbLabel: "Accessoires",
    brands: [],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
