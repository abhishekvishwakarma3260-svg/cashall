/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL:
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      "postgresql://postgres.ipzvutzhvmtnybelwspw:lleQ5bYxoaDiDm4T@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=5&pool_timeout=30&sslmode=require",
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
