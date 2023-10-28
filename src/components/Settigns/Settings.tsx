'use client';

import { currentUserDataAtom, isLoggedInAtom } from 'atom/authAtom';
import BottomSheet from 'components/BottomSheet';
import Modal from 'components/Modal';
import { useAtom } from 'jotai';
import supabase from 'lib/supabase';
import adminAuthClient from 'lib/supabase/adminAuthClient';
import loadUserDataByUid from 'lib/supabase/loadUserDataByUid';
import logout from 'lib/supabase/logout';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Settings = () => {
  const router = useRouter();
  const [currentUserData] = useAtom(currentUserDataAtom);
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const onDismiss = (e: any) => {
    router.push('/');
  };
  const onLogout = async () => {
    await logout({
      success: () => {
        setIsLoggedIn(false);
        router.push('/');
      },
      error: () => {
        alert('로그아웃중 오류가 발생하였습니다.');
      },
    });
  };
  const onWithdrawal = async () => {
    // User profile image 지우기
    const db = await loadUserDataByUid(currentUserData.uid);
    // (0): profileImageId 로 바꾸기
    const { data: storageData, error: storageError }: any =
      await supabase.storage.from('profile_files').remove([db.profileFileId]);
    if (storageData.length === 0) {
      throw new Error('file을 storage에 삭제중 오류발생');
    }
    // User db 지우기
    const { data: deleteDbData, error: deleteDbError }: any = await supabase
      .from('users')
      .delete()
      .eq('uid', currentUserData.uid);
    if (deleteDbError) {
      throw new Error('file을 db에서 삭제중 오류발생');
    }
    // User's Post 지우기
    // User's Marker 지우기
    // User's account 지우기
    console.log(currentUserData);

    const { data: deleteUserData, error: deleteUserError } =
      await adminAuthClient.deleteUser(currentUserData.uid);
    /*
      AuthApiError: User not allowed
    at handleError (webpack-internal:///(:3000/app-pages-browser)/./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js:42:11)
    at async _handleRequest (webpack-internal:///(:3000/app-pages-browser)/./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js:79:9)
    at async _request (webpack-internal:///(:3000/app-pages-browser)/./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js:64:18)
    at async GoTrueAdminApi.deleteUser (webpack-internal:///(:3000/app-pages-browser)/./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js:225:20)
    at async onWithdrawal (webpack-internal:///(:3000/app-pages-browser)/./src/components/Settigns/Settings.tsx:76:66) */
    console.log(deleteUserData, deleteUserError);
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <BottomSheet open={true} onDismiss={onDismiss}>
      <h2>권한</h2>
      <button>현재 위치 엑세스 허용 중단하기</button>
      <h2>계정</h2>
      <button onClick={onLogout}>로그아웃하기</button>
      <button onClick={onWithdrawal}>서비스 탈퇴하기</button>
      <h2>서비스 정책</h2>
      <Link href="/?policy=terms">서비스 이용약관</Link>
      <Link href="/?policy=privacy">개인정보 취급 방침</Link>
    </BottomSheet>
  );
};

export default Settings;
