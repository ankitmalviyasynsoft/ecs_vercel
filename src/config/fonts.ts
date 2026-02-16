import localFont from 'next/font/local'

export const kaffFont = localFont({
  src: [
    // {
    //   path: '../../public/assets/fonts/Kaff/29LTKaff-Regular.otf',
    //   weight: '400',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/assets/fonts/Kaff/29LTKaff-SemiBold.otf',
    //   weight: '600',
    //   style: 'normal',
    // },

    {
      path: '../fonts/Kaff/29LTKaff-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Kaff/29LTKaff-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-kaff',
  display: 'swap',
})

// export const suisseIntlFont = localFont({
//   src: [
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-Regular-WebXL.woff',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-Regular-WebXL.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-SemiBold-WebXL.woff',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-SemiBold-WebXL.woff2',
//       weight: '600',
//       style: 'normal',
//     },
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-Bold-WebXL.woff',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: '../../public/assets/fonts/SuisseIntl/SuisseIntl-Bold-WebXL.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-suisseIntl',
//   display: 'swap',
// })
