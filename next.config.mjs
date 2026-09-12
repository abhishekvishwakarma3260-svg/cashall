const NEW_SUPABASE_POOLER_URL =
  "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require";

let resolvedDbUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || NEW_SUPABASE_POOLER_URL;
if (!resolvedDbUrl || resolvedDbUrl.includes("jqysknhobtpcbyyltnfc") || !resolvedDbUrl.includes("ipzvutzhvmtnybelwspw")) {
  resolvedDbUrl = NEW_SUPABASE_POOLER_URL;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: resolvedDbUrl,
    POSTGRES_PRISMA_URL: resolvedDbUrl,
    POSTGRES_URL: resolvedDbUrl,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cashall.vercel.app',
          },
        ],
        destination: 'https://www.cashall.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
