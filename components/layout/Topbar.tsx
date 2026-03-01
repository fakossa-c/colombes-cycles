export default function Topbar() {
  return (
    <div className="bg-anthracite text-white/50 text-[0.7rem] tracking-wide">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="tel:0142426602"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="font-medium">01 42 42 66 02</span>
          </a>
          <span className="hidden md:inline text-white/15">|</span>
          <span className="hidden md:inline">Mar – Sam · 9h – 19h</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium">
          <svg className="w-3.5 h-3.5 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="hidden sm:inline">Certifié</span> BOSCH eBike
        </div>
      </div>
    </div>
  );
}
