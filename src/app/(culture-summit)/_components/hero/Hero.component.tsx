'use client'

import { useLocale } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import Section from '@/_components/_UI/section/Section.component'
import ImageGuard from '@/_components/_UI/imageGuard/ImageGuard.component'
import { baseConfig } from '@/config'
import useDevice from '@/hooks/detect-device.hook'

interface Cta {
  text: string
  href: string
  isAnchorBlank: boolean
}

interface HeroSlide {
  segmentTitle: string
  title: string
  date: string
  startingDate: string
  image: { src: string; alt: string }
  mobileImage: { src: string; alt: string }
  video: string
  mobileVideo: string
  cta1: Cta
  cta2: Cta
  slideType: string
  color: string
}

interface HeroProps {
  heroBannerList?: HeroSlide[]
}

export default function Hero({ heroBannerList = [] }: HeroProps) {
  const locale = useLocale()
  const { isMobile, isDesktop, isTablet } = useDevice()
  console.log({ heroBannerList })

  return (
    <>
      <Section className="pt-8" key={locale}>
        <style>{paginationStyle}</style>
        <Swiper modules={[Autoplay, Pagination]} spaceBetween={30} pagination={{ clickable: true }} loop={true} className="h-[calc(100vh-120px)] w-full overflow-hidden rounded-medium md:rounded-large">
          {heroBannerList.map((slide, index) => {
            // Slide 1: Full Background (Image or Video)
            if (slide?.slideType === 'slide 1') {
              return (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full bg-black">
                    {(isDesktop || isTablet) && (
                      <video
                        // src={`${baseConfig?.MEDIA_BASE_URL}${slide?.video}`}
                        src={'/assets/video/CSAD-Video-Final.mp4'}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        role="presentation"
                        poster={`${baseConfig?.MEDIA_BASE_URL}${slide?.image?.src}`}
                        aria-hidden="true"
                        onLoadedData={() => console.log('video loaded')}
                        className="h-full w-full object-cover brightness-75 filter"
                      />
                    )}
                    {isMobile && (
                      <video
                        // src={`${baseConfig?.MEDIA_BASE_URL}${slide?.mobileVideo}`}
                        src={'/assets/video/CSAD-Video-Final.mp4'}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        role="presentation"
                        poster={`${baseConfig?.MEDIA_BASE_URL}${slide?.mobileImage?.src}`}
                        aria-hidden="true"
                        onLoadedData={() => console.log('video loaded')}
                        className="h-full w-full object-cover brightness-75 filter"
                      />
                    )}

                    <div className="absolute bottom-0 ltr:left-0 rtl:right-0 px-6 py-4 text-white md:px-12 md:py-8">
                      <h2 className="text-t-30 md:text-t-45 font-semibold leading-tight">
                        {slide?.title}
                        {slide?.date && (
                          <>
                            <br />
                            {slide?.date}
                          </>
                        )}
                      </h2>
                      {slide?.segmentTitle && <div className="mt-4 md:max-w-[772px] text-t-15 md:text-t-30 font-semibold leading-tight opacity-90">{slide?.segmentTitle}</div>}
                    </div>
                  </div>
                </SwiperSlide>
              )
            }

            // Slide 2: Split Layout (Content + Image)
            if (slide?.slideType === 'slide 2') {
              return (
                <SwiperSlide key={index}>
                  <div className="flex flex-col md:flex-row gap-[30px] md:h-full w-full">
                    {/* Left: Info Section */}
                    <div className="flex flex-col justify-between w-full md:w-[35%] p-6 md:p-10 rounded-medium md:rounded-large text-black" style={{ backgroundColor: `#${slide?.color || '6a329f'}` }}>
                      {slide?.segmentTitle && <div className="text-t-15 md:text-t-30 font-semibold leading-tight opacity-90  line-clamp-8">{slide?.segmentTitle}</div>}
                      <div>
                        <h2 className="mb-2 text-t-15 md:text-t-30 font-semibold leading-tight">
                          {slide?.title}
                          {slide?.startingDate && slide?.startingDate !== ' ' && (
                            <>
                              <br />
                              {slide?.startingDate}
                            </>
                          )}
                        </h2>
                        {slide?.date && slide?.date !== ' ' && <div className="mt-4 text-t-15 md:text-t-30 font-semibold">{slide?.date}</div>}
                      </div>
                    </div>

                    {/* Right: Image Section */}
                    <div className="relative h-[calc(100vh-250px)] mt-auto md:h-64 md:h-64 md:h-full w-full md:w-[65%] bg-black overflow-hidden rounded-medium md:rounded-large">
                      <ImageGuard
                        src={`${isMobile ? baseConfig?.MEDIA_BASE_URL + slide?.mobileImage?.src : baseConfig?.MEDIA_BASE_URL + slide?.image?.src}`}
                        alt={isMobile ? slide?.mobileImage?.alt : slide?.image?.alt}
                        className="h-full w-full object-cover"
                        fill
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            }

            // Slide 3: Quote Slide
            if (slide?.slideType === 'slide 3') {
              return (
                <SwiperSlide key={index}>
                  <div
                    className="flex h-full w-full flex-col items-center justify-center text-center px-4 md:px-30 rounded-medium md:rounded-large"
                    style={{ backgroundColor: slide?.color ? `#${slide?.color}` : 'var(--cyan)' }} // Fallback to cyan if no color
                  >
                    <blockquote className="max-w-4xl text-t-20 md:text-t-30 font-semibold text-cyan-foreground">“{slide?.segmentTitle}”</blockquote>
                    <div className="mt-20 text-center text-cyan-foreground">
                      <div className="text-t-15 md:text-t-20 font-semibold">{slide?.title}</div>
                      <div className="text-t-15 md:text-t-20 opacity-90">{slide?.date}</div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            }
            return null
          })}
        </Swiper>
      </Section>
    </>
  )
}

// Custom styles for pagination dots
const paginationStyle = `
  .swiper-pagination-bullet {
    background: transparent;
    border: 1px solid white;
    opacity: 1;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .swiper-pagination-bullet-active {
    background: white;
  }
  .swiper-pagination {
    top: 30px !important;
    bottom: auto !important;
    right: 30px !important;
    left: auto !important;
    width: auto !important;
    display: flex;
    gap: 6px;
  }

  @media (max-width: 768px) {
   .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
  }
  }
`
