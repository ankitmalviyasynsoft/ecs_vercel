'use client'

import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageGuardProps extends ImageProps {
  fallbackSrc?: string
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str))

const defaultFallback = `data:image/svg+xml;base64,${toBase64(
  '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="#9ca3af" dy=".3em" text-anchor="middle">No Image</text></svg>',
)}`

export default function ImageGuard({ src, fallbackSrc = defaultFallback, alt = '', className, ...props }: ImageGuardProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
  }, [src])

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt} // Ensure alt is passed or defaults to empty string for decorative
      className={`${className || ''} transition-all duration-500 ease-in-out ${isLoading ? 'scale-[1.02] blur-xs grayscale' : 'scale-100 blur-0 grayscale-0'}`}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(fallbackSrc)
        setIsLoading(false)
      }}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      loading={props.loading || 'lazy'}
      unoptimized
    />
  )
}
