import BottomSheet from 'components/BottomSheet';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Terms = () => {
  const router = useRouter();

  const onDismiss = () => {
    router.push('/');
  };

  return (
    <>
      <BottomSheet open={true} onDismiss={onDismiss}>
        <Link href="/?s">뒤로가기</Link>
        <h1>개인정보 취급 방침</h1>
      </BottomSheet>
    </>
  );
};

export default Terms;
