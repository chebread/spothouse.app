const checkPwFormat = (pw: string) => {
  const regexp = /(?=.*\d)(?=.*[a-z]).{8,}/gi;
  const matchesArray = pw.match(regexp);
  if (matchesArray === null) return false;
  else return true;
};

export default checkPwFormat;
