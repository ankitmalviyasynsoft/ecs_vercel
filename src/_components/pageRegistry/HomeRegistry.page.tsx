import { HomeData } from '@/types/culture-summit/api'
import Hero from '../../app/(culture-summit)/_components/hero/Hero.component'
import TextParagraph from '../../app/(culture-summit)/_components/textparagraph/TextParagraph.component'
import Statistics from '../../app/(culture-summit)/_components/statistics/Statistics.component'
import About from '../../app/(culture-summit)/_components/about/About.component'
import Testimonial from '../../app/(culture-summit)/_components/testimonial/Testimonial.component'
import CorePartner from '../../app/(culture-summit)/_components/core-partners/CorePartner.component'

const componentRegistry = {
  heroBannerSection: Hero,
  textParagraph: TextParagraph,
  statistics: Statistics,
  about: About,
  testimonial: Testimonial,
  partners: CorePartner,
}

interface HomeRegistryProps {
  data: HomeData
}

export const HomeRegistry = ({ data }: HomeRegistryProps) => {
  return (
    <>
      {Object?.entries(data || {})?.map(([key, sectionData]) => {
        const Component = componentRegistry[key as keyof typeof componentRegistry]
        if (!Component || !sectionData) return null
        return <Component key={key} {...sectionData} />
      })}
    </>
  )
}
