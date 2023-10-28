import supabase from '.';

const logout = async ({ success, error }) => {
  const { error: singOutError } = await supabase.auth.signOut();
  if (singOutError === null) {
    success();
  } else {
    error();
  }
};
export default logout;
