const checkBio = (string: string) => {
  const regexp = /^.{0,150}$/gi; // 0글자 이상 150자 이하
  const matchesArray = string.match(regexp);
  if (matchesArray === null) return false;
  else return true;
};

export default checkBio;
