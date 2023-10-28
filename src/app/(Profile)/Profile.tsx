import loadUserDataByUsername from 'lib/supabase/loadUserDataByUsername';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { currentUserDataAtom } from 'atom/authAtom';
import ProfileImageViewer from 'components/ProfileImageViewer';
import SeeMore from 'components/SeeMore';
import disableSelection from 'styles/disableSelection';
import disableHighlight from 'styles/disableHighlight';

// (0): 아래로 내릴 수 있는 기능 추가하기
// (0): 프로필이 자신인지 확인하는 기능 추가하기 => 더보기 클릭시 모달이 뜨고, 거기서 팔로워, 팔로잉 볼 수 있고 관리 가능함
// (0): username, profile img, desc 길게 누르는 것 인식되면 (라이브러리 쓰기) username을 길게 눌렀으면 username만 변경할 수 있는 모달을 제공함, 다른 것들도 별개로 모달을 제공함!
// (0): 프로필 사진 누르면 큰 화면으로 프로필 사진이 뜸 (모달로서), 길게 누르면 위와 같은 기능이 작동함 (수정기능)
// (0): X 버튼 추가하기 (오직 데스크탑만)
// (0): Threads 처럼 구성하기 (아래에서 위로 나오는 것 처럼)

const Profile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramUsername = searchParams.get('u');
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [userData, setUserData] = useState<any>({});
  const [isUserExisted, setIsUserExisted] = useState(false);
  const [isPersonalProfile, setIsPersonalProfile] = useState(false); // 개인 프로필인가?
  const [isFollowing, setIsFollowing] = useState(false); // 내가 팔로잉 하는 사람인지
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);
  const [isProfileImageClicked, setIsProfileImageClicked] = useState(false);

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
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramUsername]);

  const onFollow = (e: any) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };
  const onClose = (e: any) => {
    router.push('/');
  };
  const onProfileImageClick = (e: any) => {
    e.stopPropagation();
    setIsProfileImageClicked(!isProfileImageClicked);
  };
  const onMoreSee = (e: any) => {
    e.stopPropagation();
    setIsSeeMoreClicked(!isSeeMoreClicked);
  };
  const onUsernameClick = (e: any) => {
    e.stopPropagation();
    if (isPersonalProfile) {
      //
    }
  };
  const onBioClick = (e: any) => {
    e.stopPropagation();
    if (isPersonalProfile) {
      //
    }
  };

  return (
    <>
      <Container $visible={isUserExisted}>
        <CloseBtnContainer onClick={onClose}>
          <CloseBtnWrapper>
            <CloseBtn></CloseBtn>
          </CloseBtnWrapper>
        </CloseBtnContainer>
        <ProfileContainer>
          <Wrapper>
            <>
              <LeftWrapper>
                <ProfileImage
                  style={{
                    backgroundImage: `url(${userData.profileFileUrl})`,
                  }}
                  onClick={onProfileImageClick}
                ></ProfileImage>
                <InfoWrapper>
                  <UsernameWrapper>
                    <Username
                      onClick={onUsernameClick}
                      $isPersonalProfile={isPersonalProfile}
                    >
                      {userData.username}
                    </Username>
                  </UsernameWrapper>
                  <BioWrapper>
                    <Bio
                      onClick={onBioClick}
                      $isPersonalProfile={isPersonalProfile}
                    >
                      {userData.bio}
                    </Bio>
                  </BioWrapper>
                </InfoWrapper>
              </LeftWrapper>
              <RightWrapper>
                {isPersonalProfile ? (
                  <MoreSeeBtn onClick={onMoreSee}>더보기</MoreSeeBtn>
                ) : (
                  <>
                    <FollowBtn onClick={onFollow} $isFollowing={isFollowing}>
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </FollowBtn>
                  </>
                )}
              </RightWrapper>
            </>
          </Wrapper>
        </ProfileContainer>
      </Container>
      {isSeeMoreClicked ? <SeeMore /> : ''}
      {isProfileImageClicked ? (
        <ProfileImageViewer
          src={userData.profileFileUrl}
          onClick={onProfileImageClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

const ProfileContainer = styled.div`
  // 이거 때문에 사이즈 유지됨. 지우지 말기.
  width: 100%;
`;
const CloseBtnContainer = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  padding: 0.75rem; // padding: 0.75rem 0 0 0 /  padding: 0.75rem
`;
const CloseBtn = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  background-color: rgb(219, 219, 219);
  border-radius: 2px;
  box-sizing: border-box;
  height: 4px;
  width: 48px;
`;

const Container = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  z-index: 1;
  bottom: 0;
  background: #fff;
  width: 100%;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;

  box-shadow: 0 -10.5px 21px rgba(0, 0, 0, 0.08);
  /* 
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
  } */
`;

const Wrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
  /* box-sizing: border-box; */
  padding: 1rem; // padding: 1rem / padding: 0 1rem 1rem 1rem
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
    $isPersonalProfile ? 'pointer' : 'text'};
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
const Bio = styled.p<{ $isPersonalProfile?: boolean }>`
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
