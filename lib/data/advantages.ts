export type Advantage = {
  key: string;
  title: string;
  description: string;
};

export const advantages: Advantage[] = [
  {
    key: "diagnostic",
    title: "On diagnostique avant de facturer",
    description:
      "Avant de vous parler de prix, on regarde ce qui se passe vraiment. Chez nous, le diagnostic ne coûte rien : parce qu'un devis juste commence par une inspection honnête.",
  },
  {
    key: "honnete",
    title: "On ne remplace pas ce qui n'est pas usé",
    description:
      "Si votre chaîne peut encore rouler 1 000 km, on ne vous en vend pas une nouvelle. On vous dit où en est votre vélo, et vous décidez. La confiance ne s'achète pas : elle se mérite à chaque visite.",
  },
  {
    key: "marques",
    title: "On travaille sur toutes les marques",
    description:
      "Peu importe où vous avez acheté votre vélo. Ce qui compte, c'est de le remettre en état correctement. On s'occupe des vélos achetés chez nous et de tous les autres.",
  },
  {
    key: "bosch",
    title: "On est certifiés BOSCH",
    description:
      "Pour les vélos à assistance électrique avec moteur BOSCH, on dispose des outils de diagnostic officiels. Pas d'à-peu-près, pas d'improvisation.",
  },
  {
    key: "explications",
    title: "On explique ce qu'on a fait",
    description:
      "Quand vous récupérez votre vélo, on vous dit ce qui a été fait et pourquoi. Si une pièce a été changée, on peut vous la montrer. C'est une règle chez nous.",
  },
];
