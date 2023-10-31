import BottomSheet from 'components/BottomSheet';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Terms from './Terms';
import Privacy from './Privacy';
import License from './License';
import {
  BottomSheetFooter,
  BottomSheetFooterBtn,
} from 'components/BottomSheet/BottomSheetFooter';

const About = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramAbout = searchParams.get('a');

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <BottomSheet
      open={true}
      onDismiss={onDismiss}
      footer={
        paramAbout != '' ? (
          <BottomSheetFooter>
            <BottomSheetFooterBtn as={Link} href="/?a">
              <span>뒤로가기</span>
            </BottomSheetFooterBtn>
          </BottomSheetFooter>
        ) : (
          ''
        )
      }
      header={(() => {
        switch (paramAbout) {
          case '':
            return '정보';
          case 't':
            return '서비스 이용약관';
          case 'p':
            return '개인정보 취급 방침';
          case 'l':
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
                <h2>정보</h2>
                <p>
                  <Link href="/?a=t">서비스 이용약관</Link>
                </p>
                <p>
                  <Link href="/?a=p">개인정보 취급 방침</Link>
                </p>
                <p>
                  <Link href="/?a=l">오픈소스 라이센스</Link>
                </p>
                <p>
                  <Link href="https://github.com/chebread" target="_self">
                    만든이
                  </Link>
                </p>
              </>
            );
          case 't':
            return <Terms />;
          case 'p':
            return <Privacy />;
          case 'l':
            return <License />;
          default:
            return null;
        }
      })()}
    </BottomSheet>
  );
};

export default About;
