export type TeamMember = {
  name: string;
  surname: string;
  role: string;
  description: string;
  accent: string;
};

export const team: TeamMember[] = [
  {
    name: "David",
    surname: "Thibault",
    role: "Fondateur · Gérant",
    description:
      "Quinze ans plus tard, il connaît encore chaque client par son prénom, et souvent aussi par son vélo.",
    accent: "C'est lui qui a posé les règles de la maison.",
  },
  {
    name: "François",
    surname: "",
    role: "Technicien composants",
    description:
      "Groupes Shimano, géométrie de cadre. Il s'y connaît avec une précision qui rassure les passionnés.",
    accent: "Et il sait expliquer simplement à ceux qui débutent.",
  },
  {
    name: "Mathys",
    surname: "",
    role: "Spécialiste VAE · Certifié BOSCH",
    description:
      "Il diagnostique les problèmes d'assistance électrique là où d'autres ateliers abandonnent.",
    accent: "Si votre VAE a un souci, il trouvera d'où ça vient.",
  },
  {
    name: "Christophe",
    surname: "",
    role: "Réparations",
    description:
      "Les câbles tendus, les freins mordants, la transmission qui ne grince plus.",
    accent: "Un travail soigné, sans raccourcis.",
  },
];
