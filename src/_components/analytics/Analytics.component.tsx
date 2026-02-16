import Script from 'next/script'
import { baseConfig } from '@/config'

export default function Analytics() {
  return (
    <>
      <Script defer strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${baseConfig.GA_KEY}`} />
      <Script
        defer
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${baseConfig.GA_KEY}');
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${baseConfig.GTM_KEY}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
    </>
  )
}
