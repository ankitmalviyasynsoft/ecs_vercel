import Section from '@/_components/_UI/section/Section.component'
import { getPrivacyPolicy } from '@/service/culture-summit/privacy-policy/getPrivacyPolicy'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import { getUserLocale } from '@/i18n/locale'

export default async function Page() {
  const privacyPolicyData: any = await getPrivacyPolicy({})
  const locale = await getUserLocale()

  if (!privacyPolicyData) {
    return (
      <>
        <Section>
          <h1 className="text-t-40">Privacy Policy</h1>
          <p>No data found</p>
        </Section>
      </>
    )
  }

  return (
    <Section className="!pt-10 !pb-10 md:!pt-[5rem] md:!pb-[9.4rem]">
      <div className="md:max-w-226">
        <h1 className="text-t-40 font-semibold">{privacyPolicyData?.data?.innerBanner?.title || 'Privacy Policy'}</h1>

        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: ({ node, ...props }) => <h2 {...props} className="text-t-20 mt-10 md:mt-25 mb-8 font-semibold leading-[25px]" />,
            h3: ({ node, ...props }) => <h3 {...props} className="text-t-20 mt-10 md:mt-25 mb-8 font-semibold leading-[25px]" />,
            div: ({ node, ...props }) => <p {...props} className="text-t-20 mt-5 leading-[25px]" />,
            p: ({ node, ...props }) => <p {...props} className="text-t-20 mt-5 leading-[25px]" />,
            ul: ({ node, ...props }) => <ul {...props} className={`text-t-20 pt-5 list-disc ${locale === 'ar' ? 'pr-10 md:pr-20' : 'pl-10 md:pl-20'} leading-[25px]`} />,
            li: ({ node, ...props }) => <li {...props} className="text-t-20 pt-5 leading-[25px]" />,
          }}
        >
          {privacyPolicyData?.data?.contentWrapper?.description || ''}
        </ReactMarkdown>
      </div>
    </Section>
  )
}
