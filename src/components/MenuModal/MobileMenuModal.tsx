import { isMenuClickedAtom } from 'atom/feedAtom';
import BottomSheet from 'components/BottomSheet';
import { useAtom } from 'jotai';
import Link from 'next/link';
import styled from 'styled-components';
import disableHighlight from 'styles/disableHighlight';
import disableSelection from 'styles/disableSelection';

const MobileMenuModal = ({ onDismiss }) => {
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
        <hr />
        <Menu as={Link} href="/?a" onClick={onMenu}>
          <span>정보</span>
        </Menu>
        <hr />
      </Container>
    </BottomSheet>
  );
};

const Menu = styled.button`
  all: unset;
  cursor: pointer;
  ${disableHighlight}
  ${disableSelection}

  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  padding: 1rem;

  &:active {
    /* background-color: #efefef; */
  }
  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  hr {
    border: 0;
    width: 100%;
    margin-top: 0;

    margin-bottom: 0;

    height: 1px;

    margin-left: 0;
    background-color: #e6e6e6;
    margin-right: 0;
  }
`;

export default MobileMenuModal;
