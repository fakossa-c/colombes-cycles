"use client";

import { useState, FormEvent } from "react";
import { useReveal } from "@/components/ui/useReveal";

export default function ContactForm() {
  const ref = useReveal(0.15);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    email: "",
    type: "",
    message: "",
  });

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.nom.trim()) errs.nom = "Veuillez entrer votre nom.";
    if (!form.email.trim()) {
      errs.email = "Veuillez entrer votre adresse email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Adresse email invalide.";
    }
    if (!form.type) errs.type = "Veuillez choisir un type de demande.";
    if (!form.message.trim()) errs.message = "Veuillez entrer votre message.";
    return errs;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  }

  if (submitted) {
    return (
      <section ref={ref}>
        <div className="reveal rounded-sm bg-ivory p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/10">
            <svg className="h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-syne font-800 text-[1.5rem] text-anthracite">
            Message bien recu.
          </h3>
          <p className="mt-4 text-anthracite/60 leading-relaxed max-w-md mx-auto">
            On a recu votre demande. On vous repond dans la journee ou le lendemain matin selon l&apos;heure d&apos;envoi. Si c&apos;est urgent, appelez-nous directement.
          </p>
        </div>
      </section>
    );
  }

  const inputBase =
    "w-full rounded-sm border border-anthracite/[0.08] bg-white p-4 text-anthracite text-[0.9rem] outline-none transition-colors duration-300 focus:border-terracotta placeholder:text-anthracite/30";

  return (
    <section ref={ref}>
      <form onSubmit={handleSubmit} noValidate className="reveal space-y-5">
        {/* Nom */}
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-[0.8rem] font-semibold tracking-wide text-anthracite/70">
            Votre nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className={inputBase}
            placeholder="Votre nom"
          />
          {errors.nom && <p className="mt-1 text-[0.75rem] text-red-600">{errors.nom}</p>}
        </div>

        {/* Telephone */}
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-[0.8rem] font-semibold tracking-wide text-anthracite/70">
            Votre numéro
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            className={inputBase}
            placeholder="06 00 00 00 00"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[0.8rem] font-semibold tracking-wide text-anthracite/70">
            Votre adresse email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            placeholder="email@exemple.fr"
          />
          {errors.email && <p className="mt-1 text-[0.75rem] text-red-600">{errors.email}</p>}
        </div>

        {/* Type de demande */}
        <div>
          <label htmlFor="type" className="mb-1.5 block text-[0.8rem] font-semibold tracking-wide text-anthracite/70">
            Type de demande
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className={`${inputBase} ${!form.type ? "text-anthracite/30" : ""}`}
          >
            <option value="" disabled>
              Choisir...
            </option>
            <option value="achat">Achat d&apos;un velo</option>
            <option value="reparation">Reparation ou entretien</option>
            <option value="conseil">Conseil avant achat</option>
            <option value="autre">Autre demande</option>
          </select>
          {errors.type && <p className="mt-1 text-[0.75rem] text-red-600">{errors.type}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-[0.8rem] font-semibold tracking-wide text-anthracite/70">
            Decrivez votre demande
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className={`${inputBase} resize-none`}
            placeholder="Plus c'est precis, mieux on peut vous aider."
          />
          {errors.message && <p className="mt-1 text-[0.75rem] text-red-600">{errors.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="relative inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-terracotta-dark active:scale-[0.97]"
        >
          Envoyer
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </button>
      </form>
    </section>
  );
}
