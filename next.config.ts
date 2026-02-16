import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  distDir: 'build',
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apim.dctt.gov.ae',
        port: '',
        pathname: '/CultureSummit/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*).(png|jpg|jpeg|svg|mp4)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
