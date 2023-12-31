import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import MainNavigation from '@/components/layout/MainNavigation';
import './globals.css'
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aycron Challenge App',
  description: 'Online Store framework powered by NextJS',
}

/**
 * Layout requires using a modal alongside children to correctly display the Modal on 
 * route interception as well as parallel routes.
 * https://stackoverflow.com/questions/76439415/intercepting-routes-nextjs-not-rendering-modal
 */
export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-blue-100 dark:bg-zinc-800')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <MainNavigation />
            {children}
            {modal}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
