import hashMaker from 'lib/hashMaker';
import supabase from 'lib/supabase';

const signUp = async ({ uid, username, bio, profileImageFile }) => {
  const profileFileId = hashMaker();
  // upload profile image
  const { data: uploadStorage, error: uploadStorageError } =
    await supabase.storage
      .from('profile_images')
      .upload(profileFileId, profileImageFile);

  if (uploadStorageError) {
    throw new Error('file을 storage에 업로드중 오류 발생');
  }
  // create file viewer url
  const { data: fileUrl, error: fileUrlError }: any = supabase.storage
    .from('profile_images')
    .getPublicUrl(profileFileId);
  if (fileUrlError) {
    // an error occurs
    throw new Error('file signed url 생성중 오류 발생');
  }
  const db = {
    // (규칙): 값을 공백으로 지정해야 할시는 ''로 저장함
    profileFileUrl: fileUrl.publicUrl,
    profileFileId: profileFileId,
    uid: uid,
    username: username,
    bio: bio,
  };
  const { data: uploadDb, error: uploadDbError } = await supabase
    .from('users')
    .insert(db);
  if (uploadDbError) {
    throw new Error('file을 db에 업로드중 오류 발생');
  }

  return db;
};

export default signUp;
