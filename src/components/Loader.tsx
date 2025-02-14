import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const LoaderRoot = styled.div({
  position: 'fixed',
  inset: 0,
  background: '#fff',
});

const Circle = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '4rem',
  height: '4rem',
  border: '5px solid #d50000',
  borderTopColor: 'transparent',
  borderRadius: '50%',
  animation: `${rotate} 1s linear infinite`,
});

const CircleInner = styled(Circle)({
  width: '3rem',
  height: '3rem',
  animationDirection: 'reverse',
});

const Loader = () => (
  <LoaderRoot>
    <Circle />
    <CircleInner />
  </LoaderRoot>
);

export default Loader;
