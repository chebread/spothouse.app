import License from 'app/(Policy)/License';
import Privacy from 'app/(Policy)/Privacy';
import Terms from 'app/(Policy)/Terms';
import Preferences from 'app/(Preferences)';
import BottomSheet from 'components/BottomSheet';
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
      header="설정"
      footer={
        <Footer>
          <button>
            <span>뒤로가기</span>
          </button>
        </Footer>
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

const Footer = styled.div`
  display: flex;
  justify-content: center;
  button {
    all: unset;
    cursor: pointer;

    transition-property: transform background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;

    background-color: rgb(245, 245, 245);
    box-sizing: border-box;
    border: 1px solid rgb(203, 213, 225);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    width: 640px;
    height: 3rem;
    &:active {
      background-color: rgb(235, 235, 235);
      transform: scale(0.96);
    }
    span {
      font-size: 1rem;
      line-height: 130%;
      font-weight: 600;
    }
  }
`;

export default Settings;
