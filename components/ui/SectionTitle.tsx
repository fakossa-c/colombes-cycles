type SectionTitleProps = {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
  tag?: string;
};

export default function SectionTitle({
  children,
  light = false,
  className = "",
  tag,
}: SectionTitleProps) {
  return (
    <div className={className}>
      {tag && (
        <p className={`text-[0.7rem] font-semibold tracking-[0.25em] uppercase mb-4 ${
          light ? "text-terracotta-light" : "text-terracotta"
        }`}>
          {tag}
        </p>
      )}
      <h2
        className={`font-syne font-800 text-[2rem] md:text-[2.8rem] lg:text-[3.5rem] leading-[1.05] tracking-tight ${
          light ? "text-white" : "text-anthracite"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
