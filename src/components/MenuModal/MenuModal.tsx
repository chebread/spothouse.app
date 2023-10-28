import { isLoggedInAtom } from 'atom/authAtom';
import { useAtom } from 'jotai';
import supabase from 'lib/supabase';
import logoutUser from 'lib/supabase/logoutUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import disableHighlight from 'styles/disableHighlight';
import disableSelection from 'styles/disableSelection';

// (0): 왜 Threads 처럼 되지 않는가?

const MenuModal = ({ visible, onCollapse }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

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

  return (
    <Container $visible={visible}>
      <Wrapper>
        <MenuLink onClick={onCollapse} href={'/?s'}>
          <span>설정</span>
        </MenuLink>
        <MenuHr />
        <MenuLink onClick={onCollapse} href="/?n">
          <span>알림</span>
        </MenuLink>
        <MenuHr />
        <Menu
          onClick={() => {
            onCollapse();
            onLogout();
          }}
        >
          <span>로그아웃</span>
        </Menu>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
  margin: 5rem 1.5rem; // (0): Threads 처럼 transform 으로 바꾸기
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 174px;

  background-color: #fff;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
  border: 0.5px rgba(0, 0, 0, 0.04) solid;
  border-radius: 1rem;

  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-name: smooth;

  @keyframes smooth {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
const Menu = styled.button`
  all: unset;

  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  margin-bottom: 0;
  cursor: pointer;

  width: 100%;
  height: 100%;

  padding: 16px;
  box-sizing: border-box;

  span {
    // (0): 왜 Threads 처럼 되지 않는가?
    font-size: 15px;
    line-height: 21px;
    font-weight: 600;
  }
`;
const MenuLink = styled(Link)`
  all: unset;
  ${disableHighlight}
  ${disableSelection}

  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  margin-bottom: 0;
  cursor: pointer;

  width: 100%;
  height: 100%;

  padding: 16px;
  box-sizing: border-box;

  span {
    font-size: 15px;
    line-height: 21px;
    font-weight: 600;
  }
`;
const MenuHr = styled.hr`
  border-left-width: 0;
  width: 100%;
  margin-top: 0;
  border-right-width: 0;
  margin-bottom: 0;
  border-top-width: 0;
  height: 0.5px;
  border-bottom-width: 0;
  margin-left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  margin-right: 0;
`;

export default MenuModal;
