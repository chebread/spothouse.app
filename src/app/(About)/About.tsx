import BottomSheet from 'components/BottomSheet';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Terms from './Terms';
import Privacy from './Privacy';
import License from './License';
import BottomSheetFooter from 'components/BottomSheet/FooterBtn';

const About = ({ open }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramAbout = searchParams.get('about');

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight, maxHeight }) => {
        if (paramAbout === '') {
          return minHeight;
        } else {
          return maxHeight - maxHeight / 15;
        }
      }}
      footer={
        paramAbout != '' ? (
          <BottomSheetFooter as={Link} href="/?about">
            뒤로가기
          </BottomSheetFooter>
        ) : (
          ''
        )
      }
      header={(() => {
        switch (paramAbout) {
          case '':
            return '정보';
          case 'terms':
            return '서비스 이용약관';
          case 'privacy':
            return '개인정보 취급 방침';
          case 'license':
            return '오픈소스 라이센스';
          default:
            return null;
        }
      })()}
    >
      {(() => {
        switch (paramAbout) {
          case '':
            return (
              <>
                <p>
                  <Link href="/?about=terms">서비스 이용약관</Link>
                </p>
                <p>
                  <Link href="/?about=privacy">개인정보 취급 방침</Link>
                </p>
                <p>
                  <Link href="/?about=license">오픈소스 라이센스</Link>
                </p>
                <p>
                  <Link href="https://github.com/chebread" target="_self">
                    만든이
                  </Link>
                </p>
              </>
            );
          case 'terms':
            return <Terms />;
          case 'privacy':
            return <Privacy />;
          case 'license':
            return <License />;
          default:
            return null;
        }
      })()}
    </BottomSheet>
  );
};

export default About;
