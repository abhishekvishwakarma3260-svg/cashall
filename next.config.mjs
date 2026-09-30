let resolvedDbUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: resolvedDbUrl,
    POSTGRES_PRISMA_URL: resolvedDbUrl,
    POSTGRES_URL: resolvedDbUrl,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/v1/devices/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/v1/brands/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/v1/categories/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
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
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cashall.in',
          },
        ],
        destination: 'https://www.cashall.in/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/sell-my-phone',
        destination: '/sell-used-phone',
      },
      {
        source: '/sell-my-old-phone',
        destination: '/sell-used-phone',
      },
      {
        source: '/sell-old-mobile',
        destination: '/sell-used-phone',
      },
      {
        source: '/old-phone-sell',
        destination: '/sell-used-phone',
      },
    ];
  },
};

export default nextConfig;
