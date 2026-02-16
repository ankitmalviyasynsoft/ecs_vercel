import { baseConfig } from '@/config'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')

  const res = await fetch(`${process.env.MEDIA_BASE_URL}${path}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.NEXT_PUBLIC_API_SUBSCRIPTION_KEY || '',
    },
  })

  const buffer = await res.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/svg+xml',
    },
  })
}
