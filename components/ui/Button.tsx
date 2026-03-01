import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "outline" | "outline-light" | "ghost";
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-7 py-4 text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-500 text-center magnetic-btn";

  const variants = {
    primary:
      "bg-terracotta text-white hover:bg-terracotta-dark active:scale-[0.97]",
    outline:
      "border-2 border-anthracite text-anthracite hover:bg-anthracite hover:text-cream",
    "outline-light":
      "border border-white/30 text-white hover:bg-white/10 hover:border-white/60",
    ghost:
      "text-anthracite underline decoration-terracotta underline-offset-4 decoration-2 hover:text-terracotta px-0",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "primary" && (
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
      )}
    </Link>
  );
}
