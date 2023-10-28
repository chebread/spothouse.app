import StyledComponentsRegistry from 'lib/registry';
import type { Metadata } from 'next';
import styled from 'styled-components';

import GlobalStyles from 'styles/GlobalStyles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://spothouse.app'),
  viewport: {
    initialScale: 1,
    userScalable: false,
    maximumScale: 1,
    width: 'device-width',
  },
  title: {
    template: '%s',
    default: 'Spothouse',
  },
  description: `위치를 찍다, Spothouse`,
  keywords: 'social media, SNS',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  openGraph: {
    title: 'Spothouse',
    description: `위치를 찍다, Spothouse`,
    url: 'https://spothouse.app',
    siteName: 'Spothouse',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    title: 'Spothouse',
    description: `위치를 찍다, Spothouse`,
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
