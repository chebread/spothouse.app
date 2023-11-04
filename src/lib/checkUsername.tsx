const checkUsername = (string: string) => {
  const regexp = /^[ㄱ-ㅎ가-힣\w.\!\@\-]{1,31}$/gi; // 특수문자 @ ! - _ 허용, 한글 허용, 영어 허용, 숫자 허용, 띄어쓰기 불허, 30자 제한, 특수문자 앞 뒤 얼마나 써도 상관 무
  const matchesArray = string.match(regexp);
  if (matchesArray === null) return false;
  else {
    // check if duplicate
    return true;
  }
};

export default checkUsername;
