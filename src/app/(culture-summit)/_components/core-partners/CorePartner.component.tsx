'use client'

import { baseConfig } from '@/config'
import { useGetAboutQuery } from '@/redux/services/about.api'
import Section from '@/_components/_UI/section/Section.component'
import ImageGuard from '@/_components/_UI/imageGuard/ImageGuard.component'
import RenderContent from '@/_components/renderContent/RenderContent.component'
import Link from 'next/link'

export default function CorePartner() {
  const { data, isLoading, isFetching, isError } = useGetAboutQuery()

  return (
    <RenderContent loading={isLoading || isFetching} error={isError}>
      <Section className="pb-20 md:pb-35">
        <div>
          <h2 className="font-semibold text-t-20! mb-14">{data?.partnersAndOrganizers?.corePartnersHeading || 'Core Partners'}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data?.partnersAndOrganizers?.corePartners?.map((partner: any, index: number) => (
              <Link href={partner?.href || '#'} target="_blank" key={index} className="flex h-32 items-center justify-center rounded-2xl bg-white p-6 text-black relative">
                {/* Correct image upload  */}
                <ImageGuard src={`${baseConfig?.MEDIA_BASE_URL}${partner?.src}`} alt={partner?.alt || 'Partner'} fill className="object-contain p-6" />
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </RenderContent>
  )
}
