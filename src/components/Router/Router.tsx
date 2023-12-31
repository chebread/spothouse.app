import Notifications from 'app/(Notifications)';
import Profile from 'app/(Profile)';
import { useSearchParams } from 'next/navigation';
import Settings from 'app/(Settings)';
import About from 'app/(About)';
import Search from 'app/(Search)';
import { Metadata } from 'next';

// (0): 이렇게 open으로 모든 모달(일반, 라우터)을 조종할지 아님 그냥 정말 컴포넌트를 삭제 또는 보이기로 해서 성능을 최적화 할지는 내가 선택하기, 후자는 모달 종료시 즉시되고 전자는 부드럽게 됨
// (0): 전자로 하는게 좋을 듯 함. 그렇다면 모든 모달 성능최적화 필요 (컴포넌트가 화면에 나오는 것을 인식하고 (open)으로 하면 됨) 이를 해서 성능최적화 하자
// (0): 또한 다른 것들 로직 같은 거 리펙토링도 하자
// (0): profile edit시 이름 중복 확인 및 형식 확인하기
// (0): 서비스 탈퇴 다시 만들기
// (0): 위치 추가 만들기 (검색 만들기)
// (0): 마커 만들기
// (0): 마커 클러스팅 만들기
// (0): 위치 검색 기능 만들기
// (0): 팔로잉, 팔로워 만들기
// (0): 알림 만들기 (게시물 알림은 만들지 않도록 함. 그냥 팔로워 알림만)
// (0): all: unset 없에기
// (0): 실시간 위치 추적 기능 만들기

const Router = () => {
  const searchParams = useSearchParams();
  const paramRoutes = decodeURIComponent(
    searchParams.toString().substring(0, searchParams.toString().indexOf('='))
  );

  const paramUsername = searchParams.get('u');
  const paramPosts = searchParams.get('p');

  return (
    <>
      <Profile open={paramRoutes === 'user' && paramUsername != ''} />
      <Settings open={paramRoutes === 'settings'} />
      <About open={paramRoutes === 'about'} />
      {/* <Notifications open={paramRoutes === 'notifications'} /> */}
      <Search open={paramRoutes === 'search'} />

      {(() => {
        // Router 컴포넌트로 전환함
        switch (paramRoutes) {
          // case 'u':
          //   return <Profile />;
          // case 's':
          //   return <Settings />;
          // case 'a':
          //   return <About />;
          // case 'n':
          //   return <Notifications />;
          case 'p':
            return paramPosts != '' ? '' : '';
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Router;
