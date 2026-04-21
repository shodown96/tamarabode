import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue } from 'next/font/google'
import localFont from 'next/font/local'
import { SmoothScrollProvider } from "@/components/custom/SmoothScrollProvider";

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

export const metadata: Metadata = {
  title: "Tamara-Bode Idumufinide | Product Designer",
  description: "Bridging strategy, design, and engineering to deliver meaningful digital experiences. Built By Elijah Soladoye.",
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
