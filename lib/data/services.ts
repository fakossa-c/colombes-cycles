export type ServiceKey =
  | "revision"
  | "freinage"
  | "transmission"
  | "roues"
  | "electrique"
  | "urgences";

export type Service = {
  key: ServiceKey;
  title: string;
  tagline: string;
  description: string;
  tarif: string;
};

export type ServiceLabel = {
  key: ServiceKey;
  label: string;
  style: Record<string, string>;
};

export const services: Service[] = [
  {
    key: "revision",
    title: "Révision complète",
    tagline: "Un point sur tout.",
    description:
      "On inspecte l'ensemble du vélo : freins, transmission, roues, câbles, direction, pédalier, éclairage. On remplace ce qui est usé, on règle ce qui dérive. C'est la prestation à faire une fois par an si vous roulez régulièrement.",
    tarif: "85 – 120 €",
  },
  {
    key: "freinage",
    title: "Freinage",
    tagline: "Quand ça ne mord plus assez.",
    description:
      "Patins usés, câbles étirés, leviers qui tirent dans le vide. On règle, on remplace ce qui doit l'être. Freins mécaniques ou hydrauliques, sur tous types de vélos.",
    tarif: "15 – 45 €",
  },
  {
    key: "transmission",
    title: "Transmission",
    tagline: "Quand ça grince, saute ou déraille.",
    description:
      "Dérailleur mal réglé, chaîne usée, cassette HS, manettes qui répondent mal. On diagnostique l'état de chaque pièce avant de proposer un devis. On ne remplace pas ce qui peut encore servir.",
    tarif: "20 – 80 €",
  },
  {
    key: "roues",
    title: "Roues & pneus",
    tagline: "Crevaison, voile, jante.",
    description:
      "Crevaison réparée ou chambre remplacée selon l'état du pneu. Voile de roue corrigé sur le truing stand. Rayons cassés remplacés. Si la jante est trop abîmée, on vous le dit clairement.",
    tarif: "10 – 35 €",
  },
  {
    key: "electrique",
    title: "Électrique",
    tagline: "La spécialité BOSCH.",
    description:
      "Mathys est notre spécialiste VAE, certifié BOSCH eBike. Panne d'assistance, erreur d'affichage, batterie qui ne charge plus : on diagnostique avec les outils homologués BOSCH.",
    tarif: "Devis après diagnostic",
  },
  {
    key: "urgences",
    title: "Urgences",
    tagline: "Quand vous avez besoin de rouler vite.",
    description:
      "Crevaison avant une réunion, frein cassé, dérailleur tordu après une chute. On fait ce qu'on peut pour vous dépanner rapidement. Appelez avant de passer.",
    tarif: "Selon intervention",
  },
];

export const serviceLabels: ServiceLabel[] = [
  { key: "revision", label: "Révision", style: { top: "22%", left: "48%" } },
  { key: "roues", label: "Roues", style: { top: "46%", left: "82%" } },
  { key: "freinage", label: "Freins", style: { top: "42%", right: "82%" } },
  {
    key: "transmission",
    label: "Transmission",
    style: { bottom: "20%", left: "20%" },
  },
  { key: "electrique", label: "VAE", style: { top: "34%", left: "24%" } },
];
