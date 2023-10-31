import { isMenuClickedAtom } from 'atom/mapAtom';
import BottomSheet from 'components/BottomSheet';
import { useAtom } from 'jotai';
import Link from 'next/link';
import styled from 'styled-components';

const MobileMenuModal = ({ onDismiss, onLogout }) => {
  const [isMenuClicked, setIsMenuClicked] = useAtom(isMenuClickedAtom);

  // 메뉴 클릭시
  const onMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <BottomSheet open={isMenuClicked} onDismiss={onDismiss}>
      <Container>
        <Menu as={Link} href="/?s" onClick={onMenu}>
          <span>설정</span>
        </Menu>
        <Menu as={Link} href="/?n" onClick={onMenu}>
          <span>알림</span>
        </Menu>
        <Menu as={Link} href="/?a" onClick={onMenu}>
          <span>정보</span>
        </Menu>
      </Container>
    </BottomSheet>
  );
};

const Menu = styled.button`
  all: unset;
  cursor: pointer;
  padding: 1rem;
  &:active {
    background-color: #efefef;
  }
  span {
    font-size: 1rem;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MobileMenuModal;
