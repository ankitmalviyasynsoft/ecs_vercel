'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { baseConfig } from '@/config'
import { useGetAboutQuery } from '@/redux/services/about.api'
import Section from '@/_components/_UI/section/Section.component'
import ImageGuard from '@/_components/_UI/imageGuard/ImageGuard.component'
import RenderContent from '@/_components/renderContent/RenderContent.component'
import 'swiper/css'
import 'swiper/css/pagination'

export default function About() {
  const { data, isLoading, isFetching, isError } = useGetAboutQuery()

  return (
    <RenderContent loading={isLoading || isFetching} error={isError}>
      <Section>
        <style>{paginationStyle}</style>
        <div>
          {/* Top Section: Title & Description */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-16">
            <div className="w-full lg:w-2/5">
              <h2 className="text-t-20 font-semibold">{data?.innerBanner?.title}</h2>
            </div>
            {/* descrption */}
            <div className="w-full lg:w-3/5">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  p: ({ node, ...props }) => <p {...props} className="max-w-4xl text-t-20 font-semibold opacity-90" />,
                  div: ({ node, ...props }) => <p {...props} className="max-w-4xl text-t-20 font-semibold opacity-90" />,
                }}
              >
                {data?.textParagraph?.description || ''}
              </ReactMarkdown>
            </div>
          </div>

          {/* Bottom Section: Image Slider */}
          <div className="about-pagination relative w-full mt-10 md:mt-20">
            <Swiper
              spaceBetween={30}
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="h-[400px] w-full overflow-hidden rounded-medium md:rounded-large md:h-[500px] lg:h-188"
            >
              {data?.images?.images?.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <ImageGuard src={`${baseConfig?.MEDIA_BASE_URL}${item?.large?.src}`} alt={item?.large?.alt || `Culture Summit Image ${index + 1}`} className="h-full w-full object-cover shadow-sm" fill />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Section>
    </RenderContent>
  )
}

// Custom styles for pagination dots to match design
const paginationStyle = `
  .about-pagination .swiper-pagination-bullet {
    background: transparent;
    border: 1px solid white;
    opacity: 1;
    width: 15px;
    height: 15px;
    margin: 0 4px !important;
  }
  .about-pagination .swiper-pagination-bullet-active {
    background: white;
  }
  .about-pagination .swiper-pagination {
    top: 15x !important;
    bottom: auto !important;
    right: 45px !important;
    left: auto !important;
    width: auto !important;
    text-align: right;
  }
`
