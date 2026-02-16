'use client'

import ImageGuard from '@/_components/_UI/imageGuard/ImageGuard.component'
import { baseConfig } from '@/config'
import Link from 'next/link'

//TODO: Replace with actual icons and will declare types in the props
export default function Footer(props: any) {
  const CTA_STYLES = {
    register: 'bg-primary text-primary-foreground',
    subscribe: 'bg-warning text-warning-foreground',
  }

  return (
    <footer className="w-full flex flex-col gap-1">
      {/* Top CTA Bar */}
      <div className="flex w-full flex-col md:flex-row gap-1">
        {/* Register - Blue */}
        {Object.entries(CTA_STYLES).map(([key, classes], index) => {
          const cta = props?.data?.ctaNavigation?.[index]

          if (!cta) return null

          if (key === 'register') {
            return (
              <Link key={key} href={cta?.href || '#'} className={`flex pt-2 h-15 w-full items-center justify-center text-t-20 font-semibold transition-opacity hover:opacity-90 md:w-1/2 ${classes}`}>
                {cta?.text}
              </Link>
            )
          } else {
            return (
              <Link key={key} href={cta?.href || '#'} target="_blank" className={`flex pt-2 h-15 w-full items-center justify-center text-t-20 font-semibold transition-opacity hover:opacity-90 md:w-1/2 ${classes}`}>
                {cta?.text}
              </Link>
            )
          }
        })}
      </div>

      {/* Social & App Bar - Green */}
      <div className="bg-success text-success-foreground px-4 md:px-8">
        <div className="container p-0 flex h-auto w-full flex-col items-center justify-between gap-4 py-4 md:h-16 md:flex-row md:gap-0">
          {/* Social Icons (Left) */}
          <div className="flex items-start gap-3">
            {Object.entries(props?.data?.socialLinks || {})?.map(([key, social]: any) => (
              <Link key={key} href={social?.link || '#'} target="_blank" className="group relative block h-10 w-10">
                <div className="absolute inset-0 block group-hover:hidden">
                  <ImageGuard src={baseConfig?.MEDIA_BASE_URL + social?.icon} alt={social?.alt || key} width={40} height={40} />
                </div>
                <div className="absolute inset-0 hidden group-hover:block">
                  {/* <ImageGuard src={baseConfig?.MEDIA_BASE_URL + social?.iconHover} alt={social?.alt || key} width={40} height={40} /> */}
                  <ImageGuard src={baseConfig?.MEDIA_BASE_URL + social?.iconHover} alt={social?.alt || key} width={40} height={40} />
                </div>
              </Link>
            ))}
          </div>

          {/* Download App (Right) */}
          {props?.data?.downloadAppText && (
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:items-end md:justify-end md:gap-4">
              <span className="text-t-20 font-semibold">{props?.data?.downloadAppText || ''}</span>
              <div className="flex gap-3">
                {Object.entries(props?.data?.appLinks || {})?.map(([key, app]: any) => (
                  <Link key={key} href={app?.link || '#'} target="_blank" className="group relative block h-10 w-10">
                    <div className="absolute inset-0 block group-hover:hidden">
                      <ImageGuard src={baseConfig?.MEDIA_BASE_URL + app?.icon} alt={app?.alt || key} width={40} height={40} />
                    </div>
                    <div className="absolute inset-0 hidden group-hover:block">
                      <ImageGuard src={baseConfig?.MEDIA_BASE_URL + app?.iconHover} alt={app?.alt || key} width={40} height={40} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content - White */}
      <div className="bg-white text-black p-4 md:p-8">
        <div className="container p-0">
          <div className="flex flex-col items-center justify-between gap-5 md:gap-8 md:flex-row md:items-end">
            {/* Left: Logo & Copyright */}
            <div>
              {/* Logo Simulation */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  {/* Multicolor Circle Logo placeholder */}
                  <ImageGuard src={baseConfig?.MEDIA_BASE_URL + props?.data?.footerLogo?.logo} alt="logo" width={200} height={75} />
                </div>
              </div>
            </div>

            {/* Right: Organiser Logos */}
            <div className="flex flex-col items-center gap-4 md:items-end md:gap-2">
              <div className="flex items-center gap-4 md:items-end">
                {/* Simulating the Abu Dhabi Culture Logos */}
                <span className="text-t-15">{props?.data?.organizerText}</span>
                {props?.data?.organizers?.map((logo: any, index: number) => (
                  <div key={index} className="relative h-15 w-40">
                    <ImageGuard src={baseConfig?.MEDIA_BASE_URL + logo?.image} alt={logo?.alt || 'organizer'} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
            {/* <p className="block md:hidden text-t-15 mt-5">{props?.data?.copyrightText}</p> */}
          </div>
        </div>
        <div className="container p-0 flex flex-col items-center justify-center md:justify-between md:flex-row">
          <p className="text-t-15 mt-5 md:mt-10 order-1 md:order-0 text-center md:text-start">{props?.data?.copyrightText}</p>
          <Link href={props?.data?.bottomLinks[0]?.href || '#'} className="text-t-15 mt-5 md:mt-10 order-0 md:order-1">
            {props?.data?.bottomLinks[0]?.text}
          </Link>
        </div>
      </div>
    </footer>
  )
}

function AppIcon({ type }: { type: string }) {
  return <div className="text-xs font-semibold">{type === 'apple' ? 'A' : 'P'}</div>
}
