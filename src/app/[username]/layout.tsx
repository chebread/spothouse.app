import FeedMap from 'components/FeedMap';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: {
    username: string;
  };
}): Promise<Metadata> => {
  const username = decodeURIComponent(params.username);

  return {
    title: `${username}`,
    description: '',
    openGraph: {
      title: `@${username}`,
      description: '',
    },
    twitter: {
      title: `@${username}`,
      description: '',
    },
  };
};

export default async function PostLayout({
  children,
}: {
  children: JSX.Element;
}) {
  return <>{children}</>;
}
