import StyledComponentsRegistry from 'lib/registry';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from 'styles/GlobalStyles';
import 'react-spring-bottom-sheet/dist/style.css'; // for react-spring-bottom-sheet
import 'github-markdown-css';
import FeedMap from 'components/FeedMap';
import Layout from 'styles/Layout';

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
          <Layout>
            {/* 지도는 한 번만 로드하되, 지도를 표시하는 데이터들만 바꾸기 */}
            {/* <FeedMap /> */}
            {children}
          </Layout>
          {/* Portal */}
          <div id="toast">
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              toastOptions={{
                duration: 2000,
              }}
            />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  width: 'device-width',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};
export const metadata: Metadata = {
  metadataBase: new URL('https://spothouse.app'),
  title: {
    template: '%s - Spothouse',
    default: 'Spothouse',
  },
  description: `위치를 찍다, Spothouse`,
  keywords: 'social media, SNS',
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
