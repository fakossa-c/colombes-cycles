"use server";

import { Resend } from "resend";

type ContactPayload = {
  nom: string;
  email: string;
  telephone?: string;
  type?: string;
  message: string;
};

type ActionResult =
  | { success: true }
  | { success: false; error: string };

export async function sendContact(payload: ContactPayload): Promise<ActionResult> {
  const { nom, email, message, telephone, type } = payload;

  // Validation serveur
  if (!nom.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: "Champs obligatoires manquants." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Adresse email invalide." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev sans clé : on simule un succès
    console.log("[sendContact] No RESEND_API_KEY — simulating success", payload);
    return { success: true };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Colombes Cycles <contact@colombes-cycles.fr>",
    to: ["contact@colombes-cycles.fr"],
    replyTo: email,
    subject: `Nouveau message de ${nom} — ${type ?? "Autre"}`,
    text: [
      `Nom : ${nom}`,
      `Email : ${email}`,
      telephone ? `Téléphone : ${telephone}` : "",
      type ? `Type de demande : ${type}` : "",
      "",
      `Message :`,
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("[sendContact] Resend error:", error);
    return { success: false, error: "Erreur lors de l'envoi. Réessayez ou appelez-nous." };
  }

  return { success: true };
}
