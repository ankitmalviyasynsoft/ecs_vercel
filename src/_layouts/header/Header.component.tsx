'use client'
import { EllipsisVertical, Menu } from 'lucide-react'
import React from 'react'

import LanguageSwitch from '@/_components/_globalUI/language-switch/LanguageSwitch.component'
import Link from 'next/link'
import { paths } from '@/navigate/paths'
import { useRouter } from 'next/navigation'
import { Button, Popover, PopoverContent, PopoverTrigger, Skeleton } from '@heroui/react'
import ImageGuard from '@/_components/_UI/imageGuard/ImageGuard.component'
import { baseConfig } from '@/config'

export default function Header(props: any) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  if (props.isLoading) {
    return (
      <header className="sticky top-0 z-50 border-b border-divider/10 flex h-[58px] w-full">
        <Skeleton className="w-full h-[58px]" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md text-foreground">
      <div className="container border-b border-divider/10 px-4 md:px-8 flex h-[58px] w-full items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push(paths.Home())}>
          <ImageGuard src={baseConfig.MEDIA_BASE_URL + props.data?.headerLogo?.logo} alt={props.data?.headerLogo?.alt} width={30} height={30} />
          <p className="text-t-20 font-semibold !pt-2">{props.data?.headerLogo?.title}</p>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {/* this code is not recommeded for best pratice */}
          <Link href={paths.Register()} className="text-t-15 font-semibold hover:opacity-80 bg-cyan-500 px-4.5 pt-[7px] pb-[5px] rounded-full text-cyan-foreground">
            {props.data?.contactCTA?.text}
          </Link>
          <LanguageSwitch />
        </div>

        <div className="md:hidden">
          <Popover isOpen={isOpen} onOpenChange={setIsOpen} offset={10} placement="bottom">
            <PopoverTrigger>
              <Button variant="light" size="sm" className="w-fit" isIconOnly aria-label="Open menu">
                <EllipsisVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-4 p-4 items-start">
                <div onClick={() => setIsOpen(false)}>
                  <LanguageSwitch />
                </div>
                <Link href={paths.Register()} className="text-t-20 font-semibold hover:opacity-80 !pt-2" onClick={() => setIsOpen(false)}>
                  {props.data?.contactCTA?.text}
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
