import { isMenuClickedAtom } from 'atom/feedAtom';
import useResize from 'hooks/useResize';
import { useAtom } from 'jotai';
import DesktopMenuModal from './DesktopMenuModal';
import MobileMenuModal from './MobileMenuModal';
import { useSearchParams } from 'next/navigation';

const MenuModal = () => {
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const { width } = useResize();

  const onDismiss = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return width > 639.9 ? (
    <DesktopMenuModal onDismiss={onDismiss} />
  ) : (
    <MobileMenuModal onDismiss={onDismiss} />
  );
};

export default MenuModal;
