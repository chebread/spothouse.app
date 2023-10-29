// 회원가입 페이지

import {
  isLoggedInAtom,
  isSignedUpAtom,
  uidAtom,
  currentUserDataAtom,
  signUpUserDataAtom,
} from 'atom/authAtom';
import BottomSheet from 'components/BottomSheet';
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
  // 회원가입 최종 진행
  const onSubmit = () => {
    const isProfileImageCorrect = signUpUserData.profileImageFile != null;
    console.log(signUpUserData.profileImageFile);

    const isUsernameCorrect = checkUsername(signUpUserData.username);
    console.log(isUsernameCorrect);

    const isBioCorrect = checkBio(signUpUserData.bio);
    console.log(isBioCorrect);

    if (isProfileImageCorrect && isUsernameCorrect && isBioCorrect) {
      signUp({
        profileImageFile: signUpUserData.profileImageFile,
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
  return (
    <BottomSheet
      open={true}
      snapPoints={({ maxHeight }) => maxHeight - maxHeight / 15}
    >
      <Container>
        <h1>회원가입을 위해 아래의 정보를 입력해주세요.</h1>
        <h2>이름</h2>
        <p>
          한글 혹은 알바벳을 꼭 입력하세요. 단 띄어쓰기는 할 수 없으며, 하이픈
          혹은 언더바를 사용하여 이름을 작성해주세요.
        </p>
        <input
          maxLength={50}
          type="text"
          value={signUpUserData.username}
          onChange={onChange}
          id="username"
        />
        <h2>소개글</h2>
        <p>
          소개글은 비워둘 수도 있습니다. 그리고 링크를 기입할 수도 있습니다.
          150자 이하로 작성해주세요.
        </p>
        <input
          maxLength={150}
          type="text"
          value={signUpUserData.bio}
          onChange={onChange}
          id="bio"
        />
        <h2>프로필 사진</h2>
        <p>
          10MB가 초과되지 않는 이미지를 선택하여 프로필 사진으로 꼭
          등록해주세요. 프로필 사진이 Spothouse의 규정에 어긋나는 경우 해당
          사용자는 서비스 사용이 중단될 수 있으므로 유의하시기 바랍니다.
        </p>
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
        <button
          onClick={() => {
            const isProfileImageCorrect =
              signUpUserData.profileImageFile != null;
            const isUsernameCorrect = checkUsername(signUpUserData.username);
            const isBioCorrect = checkBio(signUpUserData.bio);

            if (isBioCorrect && isUsernameCorrect && isProfileImageCorrect)
              onSubmit();
          }}
        >
          정보 입력 완료
        </button>
      </Container>
    </BottomSheet>
  );
};

const Container = styled.div``;
export default SignUp;
