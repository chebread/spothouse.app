import License from 'app/(About)/License';
import Privacy from 'app/(About)/Privacy';
import Terms from 'app/(About)/Terms';
import Preferences from 'app/(Preferences)';
import BottomSheet from 'components/BottomSheet';
import {
  BottomSheetFooter,
  BottomSheetFooterBtn,
} from 'components/BottomSheet/BottomSheetFooter';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Settings = () => {
  const searchParams = useSearchParams();
  const paramSettings = searchParams.get('s');
  const router = useRouter();

  const onDismiss = (e: any) => {
    router.push('/');
  };

  return (
    <BottomSheet
      open={true}
      onDismiss={onDismiss}
      header={(() => {
        switch (paramSettings) {
          case '':
            return '설정';
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
      footer={
        paramSettings != '' ? (
          <BottomSheetFooter>
            <BottomSheetFooterBtn as={Link} href="/?s">
              <span>뒤로가기</span>
            </BottomSheetFooterBtn>
          </BottomSheetFooter>
        ) : (
          ''
        )
      }
    >
      {(() => {
        switch (paramSettings) {
          case '':
            return <Preferences />;
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

export default Settings;
