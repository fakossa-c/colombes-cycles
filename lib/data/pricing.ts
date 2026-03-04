export type PricingRow = {
  service: string;
  tarif: string;
};

export const pricingData: PricingRow[] = [
  { service: "Révision complète", tarif: "85 – 120 €" },
  { service: "Révision simple", tarif: "45 – 65 €" },
  { service: "Réglage freins (mécanique)", tarif: "15 – 25 €" },
  { service: "Réglage freins (hydraulique)", tarif: "30 – 45 €" },
  { service: "Remplacement câbles frein", tarif: "20 – 35 €" },
  { service: "Réglage dérailleur", tarif: "15 – 25 €" },
  { service: "Remplacement chaîne", tarif: "25 – 45 € (pièce incluse)" },
  { service: "Remplacement cassette", tarif: "35 – 65 € (pièce incluse)" },
  { service: "Réparation crevaison", tarif: "10 – 18 €" },
  { service: "Remplacement chambre à air", tarif: "12 – 22 € (pièce incluse)" },
  { service: "Remplacement pneu", tarif: "20 – 45 € (pièce incluse)" },
  { service: "Correction voile de roue", tarif: "18 – 35 €" },
  { service: "Diagnostic VAE / BOSCH", tarif: "Gratuit" },
  { service: "Entretien système BOSCH", tarif: "Sur devis" },
];
