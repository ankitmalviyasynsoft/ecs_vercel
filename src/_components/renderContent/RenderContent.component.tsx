'use client'

import { Alert } from '@heroui/alert'
import { Button } from '@heroui/button'
import { reloadPage } from '@/utils'

export default function RenderContent({ loading, error, children, loadingContent, errorMessage = 'Sorry! Something went wrong.', retryText = 'Try Again', onRetry, wrapperClassName = '' }: RenderContentProps) {
  const handleRetry = () => {
    if (onRetry) return onRetry()
    reloadPage()
  }

  if (error) {
    return (
      <Alert
        color="danger"
        variant="bordered"
        title={errorMessage}
        className={`flex justify-between items-center ${wrapperClassName}`}
        endContent={
          <Button size="sm" color="danger" variant="flat" onPress={handleRetry}>
            {retryText}
          </Button>
        }
      />
    )
  }

  if (loading) {
    return <div className={`flex justify-center py-8 ${wrapperClassName}`}>{loadingContent || <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />}</div>
  }

  return <div className={wrapperClassName}>{children}</div>
}

type RenderContentProps = {
  loading: boolean
  error: boolean
  children: React.ReactNode
  loadingContent?: React.ReactNode
  errorMessage?: string
  retryText?: string
  wrapperClassName?: string
  onRetry?: () => void
}
