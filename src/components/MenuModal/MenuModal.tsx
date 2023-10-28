import { isLoggedInAtom } from 'atom/authAtom';
import { isMenuClickedAtom } from 'atom/mapAtom';
import useResize from 'hooks/useResize';
import { useAtom } from 'jotai';
import logoutUser from 'lib/supabase/logoutUser';
import { useRouter } from 'next/navigation';
import DesktopMenuModal from './DesktopMenuModal';
import MobileMenuModal from './MobileMenuModal';

const MenuModal = () => {
  const router = useRouter();
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { width } = useResize();

  console.log(width);

  const onDismiss = () => {
    setIsMenuClicked(!isMenuClicked);
  };
  const onLogout = async () => {
    await logoutUser({
      success: () => {
        setIsLoggedIn(false);
        router.push('/');
      },
      error: () => {
        alert('로그아웃중 오류가 발생하였습니다.');
      },
    });
  };

  return width > 640 ? (
    <DesktopMenuModal onDismiss={onDismiss} onLogout={onLogout} />
  ) : (
    <MobileMenuModal onDismiss={onDismiss} onLogout={onLogout} />
  );
};

export default MenuModal;
