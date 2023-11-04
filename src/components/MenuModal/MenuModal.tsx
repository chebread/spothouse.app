import { isMenuClickedAtom } from 'atom/mapAtom';
import useResize from 'hooks/useResize';
import { useAtom } from 'jotai';
import DesktopMenuModal from './DesktopMenuModal';
import MobileMenuModal from './MobileMenuModal';

const MenuModal = () => {
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);
  const { width } = useResize();

  const onDismiss = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return width > 640 ? (
    <DesktopMenuModal onDismiss={onDismiss} />
  ) : (
    <MobileMenuModal onDismiss={onDismiss} />
  );
};

export default MenuModal;
