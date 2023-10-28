import loadUserData from 'lib/supabase/loadUserDataByUid';
import {
  isLoggedInAtom,
  isSignedUpAtom,
  uidAtom,
  currentUserDataAtom,
} from 'atom/authAtom';
import { useAtom } from 'jotai';
import supabase from 'lib/supabase';
import { useState } from 'react';
import styled from 'styled-components';
import LogoSvg from 'assets/LogoSvg.svg';
import checkEmailFormat from 'lib/checkEmailFormat';
import checkPwFormat from 'lib/checkPwFormat';
import { BottomSheet } from 'react-spring-bottom-sheet';

// 로그인 및 회원가입 페이지
// 사용자가 정보가 없으면 회원가입 처리, 있으면 로그인 처리하기

// app 에 위치하되, 라우팅은 제외시키기 (쿼리스트링 라우팅 쓰기 때문에)

const Register = () => {
  const [isSignedUp, setIsSignedUp] = useAtom(isSignedUpAtom); // 회원가입시
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPw, setUserPw] = useState<string>(''); // 보안 처리하기
  const [uid, setUid] = useAtom(uidAtom);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);

  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === 'email') {
      setUserEmail(value);
    }
    if (id === 'pw') {
      setUserPw(value);
    }
  };
  const onSubmit = async () => {
    const isEmailCorrect = checkEmailFormat(userEmail);
    const isPwCorrect = checkPwFormat(userPw);
    if (isEmailCorrect && isPwCorrect) {
      const { data } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPw,
      });
      // 로그인
      if (data.user != null) {
        // 로그인 성공
        console.log('로그인 성공');
        loadUserData(data.user.id)
          .then(userData => {
            setCurrentUserData(userData);
            setIsLoggedIn(true);
          })
          .catch(error => {
            const uid = data.user.id;
            setUid(uid);
            setIsSignedUp(true);
          });
      }
      // 이미 존재하는 사용자가 Email or Pw 오류 발생하여 로그인 불가능 또는 존재하지 않는 사용자라 Email, pw 로그인 불가능 => 이런 모든 경우도 회원가입으로 전환되게 됨
      // 회원가입
      if (data.user === null) {
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPw,
        });

        if (data.user != null) {
          // 회원가입 성공
          const uid = data.user.id;
          setUid(uid);
          console.log('회원가입 성공');
          setIsSignedUp(true);
        }
        if (data.user === null) {
          // 회원가입 오류 발생
          // 이미 있는 사용자라서 => 비밀번호 오류 or 비밀번호 조건 충족 시키지 못할 시 (이건 여기서 처리)
          alert('이메일 혹은 이메일이 틀려 로그인 할 수 없습니다.');
        }
      }
    } else {
      alert('이메일 또는 비밀번호의 형식이 올바르지 않습니다.');
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Logo>
            <LogoSvg />
          </Logo>
          <Notice>Spothouse에 로그인 또는 회원가입하세요.</Notice>
          <TextInput
            type="email"
            value={userEmail}
            onChange={onChange}
            id="email"
            placeholder="이메일"
          />
          <TextInput
            type="password"
            value={userPw}
            onChange={onChange}
            id="pw"
            placeholder="비밀번호"
          />
          <SubmitBtn
            onClick={onSubmit}
            $isFilled={userEmail != '' && userPw != ''}
          >
            로그인 및 회원가입
          </SubmitBtn>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.div`
  svg {
    height: 2.5rem;
  }
  margin-bottom: 1rem;
`;

const Notice = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 140%;
  margin-bottom: 1rem;
`;
const TextInput = styled.input`
  all: unset;
  font-size: 15px;
  line-height: 140%;
  color: #000;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  width: 370px;
  background-color: rgb(245, 245, 245);
  border: rgba(0, 0, 0, 0) solid 1px;
  box-sizing: border-box;
  &:focus {
    border: rgba(0, 0, 0, 0.15) solid 1px;
  }
  &::placeholder {
    color: #999999;
  }
`;
const SubmitBtn = styled.button<{ $isFilled: boolean }>`
  all: unset;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  line-height: 140%;
  width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: #000;
  color: ${({ $isFilled }) => ($isFilled ? '#fff' : '#616161')}; // #A1A1A1
  box-sizing: border-box;
`;

export default Register;
