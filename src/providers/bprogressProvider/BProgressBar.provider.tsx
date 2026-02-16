'use client'

import { ProgressProvider } from '@bprogress/next/app'

const ProviderBProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider height="4px" color={'#fcfc'} options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  )
}

export default ProviderBProgress
