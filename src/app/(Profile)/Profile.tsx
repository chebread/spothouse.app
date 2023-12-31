import loadUserDataByUsername from 'lib/supabase/loadUserDataByUsername';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { currentUserDataAtom } from 'atom/authAtom';
import ProfileImageViewer from 'components/ProfileImageViewer';
import SeeMore from 'components/SeeMore';
import disableSelection from 'styles/disableSelection';
import disableHighlight from 'styles/disableHighlight';
import { BottomSheet as BottomSheetProvider } from 'react-spring-bottom-sheet';
import { useLongPress } from 'use-long-press';
import EditProfileModal from 'components/EditProfileModal';
import { profileUserDataAtom } from 'atom/profileAtom';
import checkUsername from 'lib/checkUsername';
import { isHeaderVisibleAtom } from 'atom/feedAtom';

// (0): 프로필이 자신인지 확인하는 기능 추가하기 => 더보기 클릭시 모달이 뜨고, 거기서 팔로워, 팔로잉 볼 수 있고 관리 가능함
// (0): /@로 분립하기. 근데 kakao map이 refresing이 없어야 함 (layout에 위치하던가 아님 nextjs에서 변하지 않는 그 react router 처럼 리프레쉬 안되게 하는 컴포넌트 찾아서 위치하기 장기적으로 이게 맞음)
// (0): Feed - post 확인 / Profile - user's post 확인 (분립하기)
// (0): client component에서 SEO 할 수 있는 방법 or Querystring router 또는 Hash routing에서 SEO 사용할 수 있는 방법 찾아내기!

// 타인의 프로필 수정시 실시간으로 바뀌진 않음. 자기 자신의 프로필 변경시만 실시간으로 변경됨.

const Profile = ({ open }) => {
  // 유의: open은 라우터일때만 예기함
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramUsername = searchParams.get('user');
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [userData, setUserData] = useAtom(profileUserDataAtom);
  const [isUserExisted, setIsUserExisted] = useState(undefined);
  const [isPersonalProfile, setIsPersonalProfile] = useState(false); // 개인 프로필인가?
  const [isFollowing, setIsFollowing] = useState(false); // 내가 팔로잉 하는 사람인지
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isProfileImageClicked, setIsProfileImageClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isHeaderVisble, setIsHeaderVisible] = useAtom(isHeaderVisibleAtom);

  const bind = useLongPress(
    () => {
      if (isPersonalProfile) {
        setIsEditClicked(!isEditClicked);
      }
    },
    {
      threshold: 350,
      captureEvent: true,
      cancelOnMovement: false, // 아이템 내부에서 움직이면 그것은 취소되지 않음
      cancelOutsideElement: true,
    }
  );

  useEffect(() => {
    const onLoad = async () => {
      loadUserDataByUsername(paramUsername)
        .then(userData => {
          // 사용자가 실존함
          setIsUserExisted(true);
          setUserData(userData);
          if (userData.uid === currentUserData.uid) {
            // 프로필 확인자가 개인 사용자인 경우
            setIsPersonalProfile(true);
          } else {
            setIsPersonalProfile(false);
          }
        })
        .catch(error => {
          // 사용자가 존재하지 않음
          setIsUserExisted(false);
        });
    };

    if (open && checkUsername(paramUsername)) {
      onLoad();
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramUsername]);

  const onFollow = (e: any) => {
    setIsFollowing(!isFollowing);
  };
  const onClose = () => {
    router.push('/');
  };
  const onProfileImageClick = (e: any) => {
    setIsProfileImageClicked(!isProfileImageClicked);
  };
  const onMoreSee = (e: any) => {
    setIsSeeMoreClicked(!isSeeMoreClicked);
  };

  return (
    <>
      <BottomSheet
        open={open && isUserExisted}
        blocking={false}
        onDismiss={onClose}
        onClick={onClose}
      >
        <Wrapper onClick={e => e.stopPropagation()}>
          <Container>
            <LeftWrapper>
              <ProfileImage
                {...bind()}
                style={{
                  backgroundImage: `url(${userData.profileFileUrl})`,
                }}
                onClick={onProfileImageClick}
              ></ProfileImage>
              <InfoWrapper>
                <UsernameWrapper>
                  <Username {...bind()} $isPersonalProfile={isPersonalProfile}>
                    {userData.username}
                  </Username>
                </UsernameWrapper>
                <BioWrapper>
                  <Bio {...bind()} $isPersonalProfile={isPersonalProfile}>
                    {userData.bio}
                  </Bio>
                </BioWrapper>
              </InfoWrapper>
            </LeftWrapper>
            <RightWrapper>
              {/* {isPersonalProfile ? (
                ''
              ) : (
                <>
                  <FollowBtn onClick={onFollow} $isFollowing={isFollowing}>
                    {isFollowing ? '팔로잉' : '팔로우'}
                  </FollowBtn>
                </>
              )} */}
              <MoreSeeBtn onClick={onMoreSee}>더보기</MoreSeeBtn>
            </RightWrapper>
          </Container>
        </Wrapper>
      </BottomSheet>

      <EditProfileModal
        open={isEditClicked}
        onDismiss={() => setIsEditClicked(!isEditClicked)}
      />
      <SeeMore
        uid={userData.uid}
        open={isSeeMoreClicked}
        onDismiss={() => setIsSeeMoreClicked(!isSeeMoreClicked)}
      />
      <ProfileImageViewer
        visible={isProfileImageClicked}
        src={userData.profileFileUrl}
        onDismiss={onProfileImageClick}
      />
      <BottomSheet
        open={open && !isUserExisted}
        blocking={false}
        onDismiss={onClose}
        onClick={onClose}
      >
        404
      </BottomSheet>
    </>
  );
};

const BottomSheet = styled(BottomSheetProvider)`
  // 모달
  [data-rsbs-overlay] {
    z-index: 1;
    box-shadow: 0 -10.5px 21px rgba(0, 0, 0, 0.08);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  // 배경 설정
  [data-rsbs-backdrop] {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  // 헤더
  [data-rsbs-header] {
    /* display: none; */
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  /* transition-property: padding;
  transition-duration: 0.2s;
  transition-timing-function: ease-out; */

  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem; // padding: 1rem / padding: 0 1rem 1rem 1rem
  /* @media (min-width: 640px) {
    // 640px 부터 데스크탑 처리함
    padding: 1.25rem; // padding: 1rem / padding: 0 1rem 1rem 1rem
  } */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.25rem;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const MoreSeeBtn = styled.button`
  all: unset;
  cursor: pointer;
  will-change: transform;
  ${disableHighlight}
  ${disableSelection}

  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 1rem;

  white-space: nowrap;

  transition-property: transform background-color color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  background-color: rgb(239, 239, 239);
  &:active {
    transform: scale(0.86);
    background-color: rgb(219, 219, 219);
  }
  color: #000;
`;
const FollowBtn = styled.button<{ $isFollowing: boolean }>`
  all: unset;
  cursor: pointer;
  will-change: transform;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 1rem;

  white-space: nowrap;

  transition-property: transform background-color color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  background-color: ${({ $isFollowing }) =>
    $isFollowing
      ? 'rgb(219, 219, 219)'
      : 'rgb(239, 239, 239)'}; // rgb(239, 239, 239)
  &:active {
    transform: scale(0.86);
    // background-color: rgb(219, 219, 219);
  }
  color: #000;

  /* box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08); */
`;
const UsernameWrapper = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 130%;
  display: block;
  width: auto;
`;
const Username = styled.span<{ $isPersonalProfile?: boolean }>`
  cursor: ${({ $isPersonalProfile }) =>
    $isPersonalProfile ? 'pointer' : 'auto'};
  ${disableHighlight}
  ${({ $isPersonalProfile }) =>
    $isPersonalProfile ? `${disableSelection}` : ''};

  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    color: ${({ $isPersonalProfile }) =>
      $isPersonalProfile ? 'rgb(119, 119, 119)' : 'inherit'};
  }
`;
const BioWrapper = styled.div`
  font-size: 0.9rem;
  line-height: 130%;
  font-weight: 400;
  display: block;
  width: auto;
`;
const Bio = styled.span<{ $isPersonalProfile?: boolean }>`
  cursor: ${({ $isPersonalProfile }) =>
    $isPersonalProfile ? 'pointer' : 'text'};
  ${disableHighlight}
  ${({ $isPersonalProfile }) =>
    $isPersonalProfile ? `${disableSelection}` : ''};
  margin: 0;

  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    color: ${({ $isPersonalProfile }) =>
      $isPersonalProfile ? 'rgb(119, 119, 119)' : 'inherit'};
  }
`;
const ProfileImage = styled.div`
  all: unset;
  cursor: pointer;
  will-change: transform;
  ${disableHighlight}
  ${disableSelection}

  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:active {
    transform: scale(0.86);
  }
  background-color: #fff;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  min-height: 3.5rem;
  min-width: 3.5rem;

  border-radius: 50%;
  box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
`;

export default Profile;
