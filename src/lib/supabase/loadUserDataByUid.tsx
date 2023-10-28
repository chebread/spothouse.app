import supabase from 'lib/supabase';

const loadUserDataByUid = async (uid: any) => {
  const dbRow = await supabase.from('users').select().eq('uid', uid);
  const db: any = dbRow.data[0];
  if (db === undefined) {
    throw new Error('존재하지 않는 파일입니다');
  }
  return db;
};

export default loadUserDataByUid;
