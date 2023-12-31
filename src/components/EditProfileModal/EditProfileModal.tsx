import { currentUserDataAtom } from 'atom/authAtom';
import { profileUserDataAtom } from 'atom/profileAtom';
import BottomSheet from 'components/BottomSheet';
import FooterBtn from 'components/BottomSheet/FooterBtn';
import { useAtom } from 'jotai';
import loadUserDataByUid from 'lib/supabase/loadUserDataByUid';
import updateUserData from 'lib/supabase/updateUserData';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';

// 프로필 사진은 인스타 처럼 하기, 기본 프로필 사진은 제공하진 않음

const EditProfileModal = ({ open, onDismiss }) => {
  const router = useRouter();
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [editUserData, setEditUserData] = useState<{
    username: string;
    bio: string;
    profileImageFile: File;
  }>({
    username: currentUserData.username,
    bio: currentUserData.bio,
    profileImageFile: null,
  });
  const [profileUserData, setProfileUserData] = useAtom(profileUserDataAtom);

  const fileAcceptTypes = {
    'image/*': [],
  };
  const FILE_MAX_SIZE = 10000000;

  useEffect(() => {
    if (!open) {
      // 화면에 보이지 않음
      // // 값 초기화하기
      setEditUserData({
        username: currentUserData.username,
        bio: currentUserData.bio,
        profileImageFile: null,
      });
    }
  }, [open]);

  const onChange = (e: any) => {
    const {
      target: { value, id },
    } = e;
    if (id === 'username') {
      setEditUserData(prev => {
        return {
          ...prev,
          username: value,
        };
      });
    }
    if (id === 'bio') {
      setEditUserData(prev => {
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
    setEditUserData(prev => {
      return {
        ...prev,
        profileImageFile: file,
      };
    });
  };

  const onSubmit = async () => {
    updateUserData({
      profileImage: editUserData.profileImageFile,
      uid: currentUserData.uid,
      bio: editUserData.bio,
      username: editUserData.username,
      currentUserData: currentUserData,
    })
      .then(async (userData: any) => {
        // console.log('----');
        // console.log(userData);

        const newUserData = userData;
        // username 변경시 라우팅하기
        if (newUserData.username != currentUserData.username) {
          router.replace(`user=${newUserData.username}`);
        }
        if (
          newUserData.username != currentUserData.username ||
          newUserData.bio != currentUserData.bio ||
          newUserData.profileFileId != currentUserData.profileFileId
        ) {
          setCurrentUserData(prev => {
            return {
              ...prev,
              username: newUserData.username,
              profileFileId: newUserData.profileFileId,
              profileFileUrl: newUserData.profileFileUrl,
              bio: newUserData.bio,
            };
          }); // 변경 사항 없으면 이거 하지 않기
          setProfileUserData(prev => {
            return {
              ...prev,
              username: newUserData.username,
              profileFileId: newUserData.profileFileId,
              profileFileUrl: newUserData.profileFileUrl,
              bio: newUserData.bio,
            };
          }); // 프로필에 보여지는 정보 바꾸기 (세로 api 가져오는 게 아니라)
        } else {
          console.log('변경사항 없음');
        }

        onDismiss();
      })
      .catch(error => {
        toast.error('프로필 업데이트 중 오류가 발생하였습니다.');
      });
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      header="프로필 편집"
      footer={<FooterBtn onClick={onSubmit}>완료</FooterBtn>}
    >
      <h2>프로필 사진</h2>
      <button>비공개</button>
      {/* on / off 토글로 바꾸기 */}
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
                  {editUserData.profileImageFile != null
                    ? '프로필 사진 다시 선택하기'
                    : '프로필 사진 선택'}
                </button>
              </div>
            </>
          );
        }}
      </Dropzone>
      <h2>이름</h2>
      <input
        type="text"
        value={editUserData.username}
        onChange={onChange}
        placeholder="이름"
        id="username"
      />
      <h2>소개</h2>
      <button>비공개</button>
      <textarea
        placeholder="소개글"
        value={editUserData.bio}
        onChange={onChange}
        id="bio"
      />
    </BottomSheet>
  );
};

export default EditProfileModal;
