'use client';

import BottomSheet from 'components/BottomSheet';
import FooterBtn from 'components/BottomSheet/FooterBtn';
import Radio from 'components/RadioBtn/Radio';
import RadioGroup from 'components/RadioBtn/RadioGroup';
import uploadSpot from 'lib/supabase/uploadSpot';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

// 여기서 위치 추가함 (uploaded와 비슷함)
// 밑의 정보 입력은 필수 입력 사항은 아닙니다
// spoting = upload spot

// (0): 전체 공개 혹은 비공개 선택 가능 (비공개는 자신의 프로필에서만 확인가능)
// 다른 위치는 카카오 api 사용. 그리고 다른 위치 추가시 거기로 snapTo하기

const UploadModal = ({ open, lat, lng, onDismiss }) => {
  const [spotData, setSpotData] = useState<{
    title: string;
    caption: string;
    mode: string;
    thumbnail: File;
  }>({
    title: '',
    caption: '',
    thumbnail: null,
    mode: 'public',
  });

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
    setSpotData(prev => {
      return {
        ...prev,
        thumbnail: file,
      };
    });
  };
  const onUploadSpot = () => {
    // uploadSpot({
    //   lat: lat,
    //   lng: lng,
    // });
  };

  const onChange = (e: any) => {
    const {
      target: { value, id },
    } = e;
    if (id === 'username') {
      setSpotData(prev => {
        return {
          ...prev,
          title: value,
        };
      });
    }
    if (id === 'bio') {
      setSpotData(prev => {
        return {
          ...prev,
          caption: value,
        };
      });
    }
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ maxHeight }) => maxHeight - maxHeight / 15}
      header="새 장소"
      footer={<FooterBtn onClick={onUploadSpot}>게시</FooterBtn>}
    >
      <h2>장소 선택</h2>
      <RadioGroup
        value={spotData.mode}
        onChange={value => {
          setSpotData(prev => {
            return {
              ...prev,
              mode: value,
            };
          });
        }}
      >
        <Radio value="public" defaultChecked>
          현재 위치
        </Radio>
        <Radio value="private">다른 위치</Radio>
      </RadioGroup>

      <h2>공개 범위</h2>
      {/* 토글로 바꾸기 */}
      <RadioGroup
        value={spotData.mode}
        onChange={value => {
          setSpotData(prev => {
            return {
              ...prev,
              mode: value,
            };
          });
        }}
      >
        <Radio value="public" defaultChecked>
          전체 공개
        </Radio>
        <Radio value="private">비공개</Radio>
      </RadioGroup>

      <h2>썸네일</h2>
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
                <button onClick={open}>썸네일 선택하기</button>
              </div>
            </>
          );
        }}
      </Dropzone>
      <h2>제목</h2>
      <p>그 장소를 표현할 수 있는 가장 좋은 제목을 지어주세요. 제한 50자</p>
      <input
        type="text"
        value={spotData.title}
        id="title"
        onChange={onChange}
      />
      <h2>설명</h2>
      <p>그 장소에 대한 설명을 적어주세요. 제한 500자</p>
      <textarea value={spotData.caption} id="description" onChange={onChange} />
    </BottomSheet>
  );
};

export default UploadModal;
