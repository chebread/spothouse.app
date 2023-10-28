import supabase from 'lib/supabase';

const loadUserDataByUsername = async (username: any) => {
  const dbRow = await supabase.from('users').select().eq('username', username);
  const db: any = dbRow.data[0];
  if (db === undefined) {
    throw new Error('존재하지 않는 사용자입니다.');
  }

  return db;
};

export default loadUserDataByUsername;
