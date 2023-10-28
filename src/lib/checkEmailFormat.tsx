const checkEmailFormat = (email: string) => {
  const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  const matchesArray = email.match(emailRegexp);
  if (matchesArray === null) return false;
  else return true;
};

export default checkEmailFormat;
