import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Privacy = () => {
  return (
    <>
      <Link href="/?s">뒤로가기</Link>
      <h1>개인정보 취급 방침</h1>
    </>
  );
};

export default Privacy;
