'use client';

import {
  isLoggedInAtom,
  isSignedUpAtom,
  uidAtom,
  currentUserDataAtom,
} from 'atom/authAtom';
import Feed from 'app/(Feed)';
import Register from 'app/(Register)';
import SignUp from 'app/(SignUp)';
import { useAtom } from 'jotai';
import supabase from 'lib/supabase';
import { useEffect, useState } from 'react';
import loadUserData from '../lib/supabase/loadUserDataByUid';
import Loading from 'app/(Loading)';
import { isApproximatePosLoadedAtom } from 'atom/mapAtom';
import Router from 'components/Router';

// 내부적은 uid 사용, 외부 사용자 개입되는 것은 username 사용

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isSignedUp, setIsSignedUp] = useAtom(isSignedUpAtom);
  const [currentUserData, setCurrentUserData] = useAtom(currentUserDataAtom);
  const [uid, setUid] = useAtom(uidAtom);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isApproximatePosLoaded] = useAtom(isApproximatePosLoadedAtom);

  useEffect(() => {
    const onLoad = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user != null) {
        loadUserData(user.id)
          .then(userData => {
            setCurrentUserData(userData);
            setIsLoggedIn(true);
            setIsLoaded(true);
          })
          .catch(error => {
            // 유저의 정보가 완전하지 않으면 다시 회원가입 받음
            setUid(user.id);
            setIsSignedUp(true);
            setIsLoaded(true);
          });
      } else {
        setIsLoaded(true);
      }
    };
    onLoad();
  }, []);

  return isLoaded ? (
    isLoggedIn ? (
      <>
        <Feed />
        {isApproximatePosLoaded ? (
          // 대략위치 로드시
          <>
            {/* 라우터 */}
            <Router />
          </>
        ) : (
          ''
        )}
      </>
    ) : (
      <>
        {isSignedUp ? <SignUp /> : ''}
        <Register />
      </>
    )
  ) : (
    <Loading />
  );
};

export default Home;
