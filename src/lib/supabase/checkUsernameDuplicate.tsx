import loadUserDataByUsername from './loadUserDataByUsername';

const checkUsernameDuplicate = async (username: string) => {
  const isDuplicate = await loadUserDataByUsername(username)
    .then(() => false)
    .catch(() => true);
  console.log(isDuplicate);

  if (isDuplicate) return false;
  else return true;
};

export default checkUsernameDuplicate;
