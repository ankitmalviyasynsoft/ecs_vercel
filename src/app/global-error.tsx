'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCcw, ServerCrash } from 'lucide-react'
import '@/styles/globals.css'
import { useTranslations } from 'next-intl'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('CultureSummit.ErrorPage')

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white text-black dark:bg-black dark:text-white">
          {/* Background Gradients */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] rounded-full bg-red-500/10 blur-[100px]" />
            <div className="absolute -right-[10%] -bottom-[10%] h-[50vw] w-[50vw] rounded-full bg-orange-500/10 blur-[100px]" />
          </div>

          <div className="z-10 container flex flex-col items-center px-4 text-center">
            {/* Animated 500 Text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'linear' }} className="relative mb-8">
              <div className="flex items-center justify-center gap-4 text-[8rem] font-bold leading-none tracking-tighter sm:text-[12rem] md:text-[16rem]">
                <motion.span initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="bg-gradient-to-br from-red-600 to-orange-600 bg-clip-text text-transparent">
                  5
                </motion.span>

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.4,
                  }}
                  className="relative flex h-[0.7em] w-[0.7em] items-center justify-center rounded-full bg-gradient-to-tr from-red-100 to-orange-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl"
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatDelay: 3,
                    }}
                    className="h-[60%] w-[60%] text-red-600"
                  >
                    <ServerCrash className="h-full w-full" strokeWidth={1.5} />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10" />
                </motion.div>

                <motion.span initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="bg-gradient-to-bl from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  0
                </motion.span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.5em] text-gray-400"
              >
                Internal Server Error
              </motion.div>
            </motion.div>

            {/* Message */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="max-w-md space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold sm:text-3xl">{t('systemMalfunctionDetected')}</h2>
                <p className="text-gray-500 dark:text-gray-400">{t('internalServerErrorDescription')}</p>
                {/* Optional Error Details */}
                {process.env.NODE_ENV === 'development' && error.message && (
                  <p className="text-xs text-red-500 mt-2 font-mono p-2 bg-red-50 rounded">
                    {t('error')} {error.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => reset()}
                  className="group flex cursor-pointer items-center gap-2 rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 shadow-lg shadow-red-500/20"
                >
                  <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  {t('tryAgain')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = '/')}
                  className="group flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-transparent px-8 py-3 text-sm font-semibold transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-900"
                >
                  <Home className="h-4 w-4" />
                  {t('backToHome')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}
