import { BottomSheet as BottomSheetProvider } from 'react-spring-bottom-sheet';
import styled from 'styled-components';
import 'react-spring-bottom-sheet/dist/style.css';
import { ReactNode } from 'react';

const BottomSheet = ({
  children,
  open,
  snapPoints,
  header,
  onDismiss,
  blocking,
  footer,
}: {
  children: any;
  open: boolean;
  snapPoints?: any;
  header?: ReactNode;
  onDismiss?: any;
  blocking?: boolean;
  footer?: ReactNode;
}) => {
  return (
    <Container
      open={open}
      snapPoints={
        snapPoints != undefined ? snapPoints : ({ minHeight }) => minHeight
      }
      header={header != undefined ? <Header>{header}</Header> : ''}
      onDismiss={onDismiss}
      blocking={blocking}
      footer={footer}
    >
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

const Header = styled.span`
  display: block;
  padding-top: 0.25rem;
  font-size: 1.1rem;
  line-height: 1.75rem;
  font-weight: 600;
`;
const Container = styled(BottomSheetProvider)`
  // 모달
  [data-rsbs-overlay] {
    z-index: 1;
    box-shadow: 0 -10.5px 21px rgba(0, 0, 0, 0.08);
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  // 배경 설정
  [data-rsbs-backdrop] {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  // 헤더
  [data-rsbs-header] {
  }
`;
const Wrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export default BottomSheet;
