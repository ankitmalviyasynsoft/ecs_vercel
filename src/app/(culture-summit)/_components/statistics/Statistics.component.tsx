'use client'

import React from 'react'
import clsx from 'clsx'

import { baseConfig } from '@/config'
import Section from '@/_components/_UI/section/Section.component'

interface StatisticItem {
  count: string
  title: string
  description: string
  imageUrl: string
  color: string
}

interface StatisticsProps {
  slideSeparator?: string
  statisticsList?: StatisticItem[]
}

export default function Statistics({ statisticsList = [] }: StatisticsProps) {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
        {statisticsList.map((item, index) => (
          <div key={index} tabIndex={0} className="group relative aspect-square w-full max-h-100 overflow-hidden rounded-medium md:rounded-large outline-none focus:outline-none">
            {/* Background Image (Revealed on hover/focus) */}
            <img
              src={`${baseConfig?.MEDIA_BASE_URL}${item?.imageUrl}`}
              alt={item?.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-focus:scale-110 group-active:scale-110"
            />

            {/* Foreground Color & Text (Hidden on hover/focus) */}
            <div
              className={clsx(
                'absolute leading-15! inset-0 flex flex-col items-center justify-center text-center transition-transform duration-300 ease-in-out',
                'bg-white text-black text-t-55 font-semibold rounded-medium md:rounded-large',
                'group-hover:-translate-x-full group-focus:-translate-x-full group-active:-translate-x-full',
              )}
              style={{ backgroundColor: item?.color ? `#${item?.color}` : undefined }}
            >
              <h3 className="text-t-30 lg:text-t-55  lg:leading-15!">{item?.count}</h3>
              <p className="text-t-30 lg:text-t-55 lg:leading-15! opacity-90">{item?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
