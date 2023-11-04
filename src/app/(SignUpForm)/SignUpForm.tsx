// 회원가입 페이지

import {
  isLoggedInAtom,
  isSignedUpAtom,
  uidAtom,
  currentUserDataAtom,
  signUpUserDataAtom,
} from 'atom/authAtom';
import BottomSheet from 'components/BottomSheet';
import {
  FooterBtnWrapperProvider,
  FooterBtnProvider,
} from 'components/BottomSheet/FooterBtnProvider';
import { useAtom } from 'jotai';
import checkBio from 'lib/checkBio';
import checkUsername from 'lib/checkUsername';
import signUp from 'lib/supabase/signUp';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';
import styled from 'styled-components';

// (0): 모달로 처리하자 (전체)
// (0): 이름 중복 확인하기
// (0): 프로필 사진 기입 확인하기

const SignUp = () => {
  const fileAcceptTypes = {
    'image/*': [],
  };
  const FILE_MAX_SIZE = 10000000; // 10mb
  // const [bio, setBio] = useState<string>('');
  // const [username, setUsername] = useState<string>('');
  // const [profileImageFile, setProfileImageFile] = useAtom(profileFileAtom);
  const [uid, setUid] = useAtom(uidAtom);
  const [isSignedUp, setIsSignedUp] = useAtom(isSignedUpAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [signUpUserData, setSignUpUserData] = useState<{
    username: string;
    bio: string;
    profileImageFile: File;
  }>({
    username: '',
    bio: '',
    profileImageFile: null,
  });

  const onChange = (e: any) => {
    const {
      target: { value, id },
    } = e;
    if (id === 'username') {
      setSignUpUserData(prev => {
        return {
          ...prev,
          username: value,
        };
      });
    }
    if (id === 'bio') {
      setSignUpUserData(prev => {
        return {
          ...prev,
          bio: value,
        };
      });
    }
  };
  const onDropFile = async (files: any) => {
    // 1개 초과 파일은 받지 않음
    if (files.length === 0) {
      alert('하나의 파일만 업로드 가능합니다');
      return;
    }
    const file = files[0];
    const isImageFile = file.type.match(/(image)/g); // type이 image, pdf 인지 파일 체크
    // check file's type
    if (isImageFile === null) {
      alert('업로드 할 수 없는 파일입니다');
      return;
    }
    if (file.size >= FILE_MAX_SIZE) {
      alert('10MB 이하의 파일만 업로드 가능합니다');
      return;
    }
    // save file
    setSignUpUserData(prev => {
      return {
        ...prev,
        profileImageFile: file,
      };
    });
  };

  console.log(checkBio(signUpUserData.bio));

  // 회원가입 최종 진행
  const onSubmit = () => {
    const isProfileImageCorrect = signUpUserData.profileImageFile != null;
    const isUsernameCorrect = checkUsername(signUpUserData.username);
    const isBioCorrect = checkBio(signUpUserData.bio);

    if (isProfileImageCorrect && isUsernameCorrect && isBioCorrect) {
      signUp({
        profileImage: signUpUserData.profileImageFile,
        uid: uid,
        bio: signUpUserData.bio,
        username: signUpUserData.username,
      })
        .then(userData => {
          setCurrentUserData(userData);
          setIsSignedUp(false); // 회원가입 종료
          setIsLoggedIn(true); // 로그인됨
        })
        .catch(error => {
          toast.error('회원가입중 오류가 발생하였습니다.');
        });
    }
  };
  console.log(checkUsername(signUpUserData.username));

  return (
    <BottomSheet
      open={true}
      snapPoints={({ minHeight }) => minHeight}
      header="회원가입"
      footer={
        <FooterBtnWrapperProvider>
          <FooterBtn
            $isCorrect={
              signUpUserData.profileImageFile != null &&
              checkUsername(signUpUserData.username) &&
              checkBio(signUpUserData.bio)
            }
            onClick={() => {
              onSubmit();
            }}
          >
            <span>가입</span>
          </FooterBtn>
        </FooterBtnWrapperProvider>
      }
    >
      <Container>
        <h2></h2>
        <input
          type="text"
          value={signUpUserData.username}
          onChange={onChange}
          placeholder="이름"
          id="username"
        />
        <h2></h2>
        <textarea
          placeholder="소개글"
          value={signUpUserData.bio}
          onChange={onChange}
          id="bio"
        />
        <h2></h2>

        <Dropzone
          onDrop={onDropFile}
          accept={fileAcceptTypes}
          noClick
          noKeyboard
          multiple={false}
        >
          {({ getRootProps, getInputProps, open, isDragActive }) => {
            return (
              <>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button onClick={open}>
                    {signUpUserData.profileImageFile != null
                      ? '프로필 사진 다시 선택하기'
                      : '프로필 사진 선택'}
                  </button>
                </div>
              </>
            );
          }}
        </Dropzone>
      </Container>
    </BottomSheet>
  );
};

const Container = styled.div``;

const FooterBtn = styled(FooterBtnProvider)<{
  $isCorrect: boolean;
}>`
  cursor: ${({ $isCorrect }) => ($isCorrect ? 'pointer' : 'not-allowed')};
  color: ${({ $isCorrect }) => ($isCorrect ? '#000' : '#616161')};
`;

export default SignUp;
