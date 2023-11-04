import Markdown from 'react-markdown';
import styled from 'styled-components';

const MarkdownViewer = ({ children }) => {
  return (
    <Container className="markdown-body">
      <Markdown>{children}</Markdown>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  &.markdown-body {
    // 임시 코드 //
    background-color: #fff;
    color: #000;
  }
`;

export default MarkdownViewer;
