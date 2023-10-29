'use client';

import BottomSheet from 'components/BottomSheet';
import Radio from 'components/RadioBtn/Radio';
import RadioGroup from 'components/RadioBtn/RadioGroup';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

// 여기서 위치 추가함 (uploaded와 비슷함)
// 밑의 정보 입력은 필수 입력 사항은 아닙니다

// (0): 전체 공개 혹은 비공개 선택 가능 (비공개는 자신의 프로필에서만 확인가능)

const SpotingModal = ({ open, lat, lng, onDismiss }) => {
  const [value, setValue] = useState('public');

  const FILE_MAX_SIZE = 10000000; // 10mb
  const fileAcceptTypes = {
    'image/*': [],
  };

  const onDropFile = async (files: any) => {
    // 1개 초과 파일은 받지 않음
    if (files.length === 0) {
      alert('하나의 파일만 업로드 가능합니다');
      return;
    }
    const file = files[0];
    const isImageFile = file.type.match(/(image)/g); // type이 image, pdf 인지 파일 체크
    // check file's type
    if (isImageFile === null) {
      alert('업로드 할 수 없는 파일입니다');
      return;
    }
    if (file.size >= FILE_MAX_SIZE) {
      alert('10MB 이하의 파일만 업로드 가능합니다');
      return;
    }
    //
  };
  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ maxHeight }) => maxHeight - maxHeight / 15}
      header="새 장소"
      footer={
        <Footer>
          <button>
            <span>게시하기</span>
          </button>
        </Footer>
      }
    >
      <h1>공개 범위</h1>

      <RadioGroup value={value} onChange={setValue}>
        <Radio value="public" defaultChecked>
          전체 공개
        </Radio>
        <Radio value="private">비공개</Radio>
      </RadioGroup>

      <h1>썸네일</h1>
      <p>그 장소를 표현할 수 있는 가장 좋은 사진을 선택하세요.</p>
      <Dropzone
        onDrop={onDropFile}
        accept={fileAcceptTypes}
        noClick
        noKeyboard
        multiple={false}
      >
        {({ getRootProps, getInputProps, open, isDragActive }) => {
          return (
            <>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button onClick={open}>프로필 사진 선택하기</button>
              </div>
            </>
          );
        }}
      </Dropzone>
      <h1>제목</h1>
      <p>그 장소를 표현할 수 있는 가장 좋은 제목을 지어주세요.</p>
      <input type="text" maxLength={150} />
      <h1>설명</h1>
      <p>그 장소에 대한 설명을 적어주세요.</p>
      <textarea maxLength={1000} />
    </BottomSheet>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: center;
  button {
    all: unset;
    cursor: pointer;

    transition-property: transform background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;

    background-color: rgb(245, 245, 245);
    box-sizing: border-box;
    border: 1px solid rgb(203, 213, 225);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    width: 640px;
    height: 3rem;
    &:active {
      background-color: rgb(235, 235, 235);
      transform: scale(0.96);
    }
    span {
      font-size: 1rem;
      line-height: 130%;
      font-weight: 600;
    }
  }
`;

export default SpotingModal;
