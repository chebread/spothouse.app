const checkPwFormat = (pw: string) => {
  const pwRegexp = /(?=.*\d)(?=.*[a-z]).{8,}/gi;
  const matchesArray = pw.match(pwRegexp);
  if (matchesArray === null) return false;
  else return true;
};

export default checkPwFormat;
