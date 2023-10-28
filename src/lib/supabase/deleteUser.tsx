import { createClient } from '@supabase/supabase-js';
import loadUserDataByUid from './loadUserDataByUid';
import supabase from '.';

// (0): User delete 버그 수정하기

const deleteUser = async ({ uid }) => {
  // User profile image 지우기
  const db = await loadUserDataByUid(uid);
  // (0): profileImageId 로 바꾸기
  const { data: storageData, error: storageError }: any = await supabase.storage
    .from('profile_images')
    .remove([db.profileFileId]);
  if (storageData.length === 0) {
    throw new Error('file을 storage에 삭제중 오류발생');
  }
  // User db 지우기
  const { data: deleteDbData, error: deleteDbError }: any = await supabase
    .from('users')
    .delete()
    .eq('uid', uid);
  if (deleteDbError) {
    throw new Error('file을 db에서 삭제중 오류발생');
  }
  // User's Post 지우기
  // User's Marker 지우기
  // User's account 지우기

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  );

  const { data: deletion_data, error: deletion_error } =
    await supabaseAdmin.auth.admin.deleteUser(
      '255d5a77-7591-4c42-b370-af3fa9704587'
    );
  if (deletion_error) alert('Error!');

  console.log(deletion_data, deletion_error);
};

export default deleteUser;
