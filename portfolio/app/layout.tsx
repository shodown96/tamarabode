import { SmoothScrollProvider } from "@/components/custom/SmoothScrollProvider";
import type { Metadata } from "next";
import { Bebas_Neue } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})


const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Variable.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Variable.woff2',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../public/fonts/Satoshi-Variable.woff2',
      weight: '600',
      style: 'semibold',
    },
    // {
    //   path: '../public/fonts/Satoshi-VariableItalic.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  variable: '--font-satoshi',
})

const originURL = "www.tamarabode.com"
const SITE_TITLE = "Tamara | Product Designer"
const SITE_DESCRIPTION = "Bridging strategy, design, and engineering to deliver meaningful digital experiences. Built By Elijah Soladoye."

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    url: originURL,
    type: 'website',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${originURL}/images/opengraph.png`,
        width: 1400,
        height: 900,
        alt: SITE_TITLE,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
