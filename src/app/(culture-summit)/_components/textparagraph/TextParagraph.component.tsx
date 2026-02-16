'use client'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Section from '@/_components/_UI/section/Section.component'

export default function TextParagraph(props: any) {
  if (!props?.description) return null

  return (
    <Section>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({ node, ...props }) => <p {...props} className="!text-t-20 md:!text-t-30 !font-semibold" />,
          div: ({ node, ...props }) => <p {...props} className="!text-t-20 md:!text-t-30 !font-semibold" />,
          span: ({ node, style, ...props }: any) => <span {...props} className="!text-t-20 md:!text-t-30 !font-semibold" />,
        }}
      >
        {String(props.description)}
      </ReactMarkdown>
    </Section>
  )
}
