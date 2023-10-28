import { isMenuClickedAtom } from 'atom/mapAtom';
import BottomSheet from 'components/BottomSheet';
import { useAtom } from 'jotai';
import Link from 'next/link';

const MobileMenuModal = ({ onDismiss, onLogout }) => {
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);

  // 메뉴 클릭시
  const onMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <BottomSheet open={isMenuClicked} onDismiss={onDismiss}>
      <Link href="/?s" onClick={onMenu}>
        설정
      </Link>

      <Link href="/?n" onClick={onMenu}>
        알림
      </Link>

      <button
        onClick={() => {
          onMenu();
          onLogout();
        }}
      >
        로그아웃
      </button>
    </BottomSheet>
  );
};

export default MobileMenuModal;
