'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Section from '@/_components/_UI/section/Section.component'
import { useLocale } from 'next-intl'

interface TestimonialItem {
  title: string
  description: string
  speakerName: string
  spaekerDetail: string
}

interface TestimonialProps {
  slideSeparator?: string
  title?: string
  items: TestimonialItem[]
}

export default function Testimonial({ title, items = [] }: TestimonialProps) {
  const locale = useLocale()

  if (!items.length) return null

  return (
    <div className="overflow-hidden">
      <Section key={locale}>
        <style>{paginationStyle}</style>
        <div className="mx-auto">
          <div className="relative mb-8 flex flex-col md:flex-row gap-4 w-full justify-between">
            <h2 className="text-t-20 font-semibold">{title || 'From our long-standing global partners'}</h2>
            {/* Pagination Container to be targeted by Swiper */}
            <div className="testimonial-pagination absolute top-10 md:top-1 right-0"></div>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: '.testimonial-pagination', // Portal pagination to the header
            }}
            spaceBetween={24}
            slidesPerView={1.1} // Show partial next slide on mobile
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.2 },
            }}
            className="testimonial-swiper w-full"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="grid h-full min-h-[520px] grid-rows-[1fr_auto] gap-6 rounded-medium md:rounded-large bg-zinc p-8 md:min-h-[560px] md:p-12">
                  <blockquote className="text-t-20 md:text-t-25 line-clamp-12 font-semibold">“{item.description}”</blockquote>
                  <div className={locale === 'ar' ? 'self-start' : 'self-end'}>
                    <div className="text-t-15 md:text-t-20 font-semibold">{item.speakerName}</div>
                    <div className="text-t-15 md:text-t-20 text-white/80">{item.spaekerDetail}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Section>
    </div>
  )
}

const paginationStyle = `
  .testimonial-pagination {
    display: flex;
    justify-content: flex-end;
  }
  .testimonial-swiper .swiper-wrapper {
    align-items: stretch;
  }
  .swiper.testimonial-swiper {
    overflow: unset !important;
  }
  .testimonial-swiper .swiper-slide {
    height: auto;
    display: flex;
  }
  .testimonial-pagination .swiper-pagination-bullet {
    background: transparent;
    border: 1px solid white;
    opacity: 1;
    width: 15px;
    height: 15px;
    margin: 0 4px !important;
  }
  .testimonial-pagination .swiper-pagination-bullet-active {

    background: white;
  }
  .testimonial-pagination .swiper-pagination {
    position: static !important;
    width: auto !important;
  }
  @media (max-width: 768px) {
    .testimonial-pagination {
      position: absolute !important;
      width: auto !important;
      top: 40px !important;
      right: 0 !important;
      display: none !important;
    }
  }
`
