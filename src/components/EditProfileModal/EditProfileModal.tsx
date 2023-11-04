import BottomSheet from 'components/BottomSheet';
import FooterBtn from 'components/BottomSheet/FooterBtn';

const EditProfileModal = ({ open, onDismiss }) => {
  const onSubmit = () => {
    onDismiss();
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      header="프로필 편집"
      footer={<FooterBtn onClick={onSubmit}>완료</FooterBtn>}
    >
      <h2>프로필 사진</h2>
      <h2>유저 이름</h2>
      <h2>소개글</h2>
    </BottomSheet>
  );
};

export default EditProfileModal;
