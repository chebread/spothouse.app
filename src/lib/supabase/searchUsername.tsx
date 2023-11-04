import supabase from '.';

const searchUsername = async (username: string) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .textSearch('username', `${username}`);
  console.log(data);
};
export default searchUsername;
