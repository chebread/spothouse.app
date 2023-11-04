import hashMaker from 'lib/hashMaker';
import supabase from 'lib/supabase';
import loadUserDataByUid from './loadUserDataByUid';

// if profileImage is null => 변경하지 않도록 함
// bio는 공백이라도 상관 무
// bio도 현재와 같으면 변경하지 않음
// 유저네임은 현재 유저의 이름과 같으면 변경하지 않음, 다르면 중복 확인후 변경함

const updateUserData = async ({
  uid,
  username,
  bio,
  profileImage,
  currentUserData,
}) => {
  let isChangedUsername = false;
  let isChangedBio = false;
  let isChangedProfileImage = false;
  let changedProfileImageId = undefined;
  let changedProfileImageUrl = undefined;

  // 이름 업데이트
  if (username != currentUserData.username) {
    // 형식 및 중복확인하기
    const { data, error } = await supabase
      .from('users')
      .update({
        username: username,
      })
      .eq('uid', uid);
    if (error) {
      throw new Error('file update 중 오류발생');
    } else {
      isChangedUsername = true;
    }
    console.log('이름 업데이트 완료');
  }
  // 소개 업데이트
  if (bio != currentUserData.bio) {
    // 형식 확인하기
    const { data, error } = await supabase
      .from('users')
      .update({
        bio: bio,
      })
      .eq('uid', uid);
    if (error) {
      throw new Error('file update 중 오류발생');
    } else {
      isChangedBio = true;
    }
    console.log('소개 업데이트 완료');
  }
  // 프로필 사진 업데이트
  if (profileImage != null) {
    // 기존 profile image 지우기
    const fileId = [currentUserData.profileFileId];
    // remove file
    const { data: storage, error: storageError }: any = await supabase.storage
      .from('profile_images')
      .remove(fileId);
    if (storage.length === 0) {
      // (0): storageError 작동하지 않는 이유
      throw new Error('file을 storage에 삭제중 오류발생');
    }
    const profileFileId = hashMaker();
    // upload profile image
    const { data: uploadStorage, error: uploadStorageError } =
      await supabase.storage
        .from('profile_images')
        .upload(profileFileId, profileImage);
    if (uploadStorageError) {
      throw new Error('file을 storage에 업로드중 오류 발생');
    } else {
      console.log(1);
      changedProfileImageId = profileFileId;
    }
    // create file viewer url
    const { data: fileUrl, error: fileUrlError }: any = supabase.storage
      .from('profile_images')
      .getPublicUrl(profileFileId);
    if (fileUrlError) {
      // an error occurs
      throw new Error('file signed url 생성중 오류 발생');
    } else {
      console.log(2);
      changedProfileImageUrl = fileUrl.publicUrl;
    }
    const { data, error } = await supabase
      .from('users')
      .update({
        profileFileUrl: fileUrl.publicUrl,
        profileFileId: profileFileId,
      })
      .eq('uid', uid);
    if (error) {
      throw new Error('file update 중 오류발생');
    } else {
      isChangedProfileImage = true;
    }
    console.log('프로필 사진 업데이트 완료');
  }

  // console.log(uid, username, bio, profileImage);
  // console.log(currentUserData);
  // console.log(
  //   isChangedUsername,
  //   isChangedBio,
  //   isChangedProfileImage,
  //   changedProfileImageId,
  //   changedProfileImageUrl
  // );

  return {
    username: isChangedUsername ? username : currentUserData.username,
    bio: isChangedBio ? bio : currentUserData.bio,
    profileFileUrl: isChangedProfileImage
      ? changedProfileImageUrl
      : currentUserData.profileFileUrl,
    profileFileId: isChangedProfileImage
      ? changedProfileImageId
      : currentUserData.profileFileId,
  };
};

export default updateUserData;
