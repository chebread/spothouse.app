'use client';

import themedPalette from 'styles/themes/themedPalette';
import { styled } from 'styled-components';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container>
      <h1>Something went wrong</h1>
      <button onClick={reset}>Try again</button>
      <pre>{error.message}</pre>
    </Container>
  );
}

const Container = styled.div`
  color: ${themedPalette.color};
`;
