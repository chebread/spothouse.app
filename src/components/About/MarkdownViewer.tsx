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
`;

export default MarkdownViewer;
