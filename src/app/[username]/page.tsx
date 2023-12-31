'use client';

import checkUsername from 'lib/checkUsername';
import { notFound } from 'next/navigation';
import Profile from './Profile';
import FeedMap from 'components/FeedMap';
import styled from 'styled-components';
import FeedHeader from 'components/FeedHeader';

const ProfilePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const paramUsername = decodeURIComponent(params.username);
  const isCorrectFormat =
    paramUsername.substring(0, 1) === '@' &&
    checkUsername(paramUsername.substring(1));

  if (!isCorrectFormat) {
    // @USERNAME 형식만 받음
    // 1개 이상 30자 이하, @ - _ 허용, 한글 및 영어 및 숫자 허용
    notFound();
  }

  return (
    <Container>
      <FeedHeader />
      <Profile username={paramUsername.substring(1)} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export default ProfilePage;
