import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Redirections 301 WordPress → Next.js (FR33)
      { source: "/accueil", destination: "/", permanent: true },
      { source: "/nos-velos-2", destination: "/nos-velos", permanent: true },
      { source: "/atelier", destination: "/reparations", permanent: true },
      { source: "/a-propos-2", destination: "/a-propos", permanent: true },
      { source: "/contact-2", destination: "/contact", permanent: true },
      // Alias courants WordPress
      { source: "/home", destination: "/", permanent: true },
      { source: "/velos", destination: "/nos-velos", permanent: true },
      { source: "/reparation", destination: "/reparations", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Appliquer à toutes les routes
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-XSS-Protection",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
