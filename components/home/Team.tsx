"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useReveal } from "@/components/ui/useReveal";

const team = [
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

export default function Team() {
  const ref = useReveal(0.08);

  return (
    <section ref={ref} id="equipe" className="bg-ivory py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="reveal mb-16 md:mb-24">
          <SectionTitle tag="L'équipe">
            <>
              Ceux qui s&apos;occupent
              <br />
              de <span className="text-terracotta">votre vélo.</span>
            </>
          </SectionTitle>
        </div>

        {/* Team grid - asymmetric */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {team.map((member, i) => (
            <div
              key={i}
              className={`reveal stagger-${i + 1} group relative bg-cream border border-anthracite/[0.06] rounded-sm p-8 md:p-10 hover:border-terracotta/20 transition-all duration-500 overflow-hidden`}
            >
              {/* Background initial */}
              <span className="absolute top-4 right-6 font-syne font-800 text-[6rem] leading-none text-anthracite/[0.025] select-none transition-colors duration-500 group-hover:text-terracotta/[0.06]">
                {member.name[0]}
              </span>

              <div className="relative">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-anthracite/[0.06] border border-anthracite/[0.08] flex items-center justify-center mb-6 group-hover:border-terracotta/20 transition-colors duration-500">
                  <span className="font-syne font-800 text-lg text-anthracite/20 group-hover:text-terracotta/40 transition-colors duration-500">
                    {member.name[0]}{member.surname ? member.surname[0] : ""}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-syne font-800 text-xl text-anthracite">
                    {member.name}
                    {member.surname && (
                      <span className="font-400 text-anthracite/40 ml-1">{member.surname}</span>
                    )}
                  </h3>
                </div>

                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-terracotta mb-4">
                  {member.role}
                </p>

                <p className="text-anthracite/45 text-[0.9rem] leading-relaxed mb-2">
                  {member.description}
                </p>
                <p className="text-anthracite/70 text-[0.9rem] leading-relaxed font-medium italic">
                  {member.accent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
