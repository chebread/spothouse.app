import { atom } from 'jotai';
const isLoggedInAtom = atom<boolean>(false); // 로그인시
const isSignedUpAtom = atom<boolean>(false); // 회원가입시
const profileFileAtom = atom<File>(new File([''], ''));
const uidAtom = atom('');
const currentUserDataAtom = atom<{
  // 현재 접속중인 사용자 정보
  profileFileUrl: string;
  profileFileId: string;
  bio: string;
  username: string;
  uid: string;
}>({
  profileFileUrl: '',
  profileFileId: '',
  bio: '',
  username: '',
  uid: '',
});

export {
  isLoggedInAtom,
  currentUserDataAtom,
  isSignedUpAtom,
  profileFileAtom,
  uidAtom,
};
