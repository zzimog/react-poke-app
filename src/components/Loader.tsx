import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  border: 5px solid black;
  border-top-color: transparent;
  border-radius: 50%;
`;

const Loader = () => {
  return (
    <div
      css={css({
        position: 'fixed',
        inset: 0,
        background: '#fff',
      })}
    >
      <Circle
        css={css({
          animation: `${rotate} 1s linear infinite`,
        })}
      />
      <Circle
        css={css({
          width: '3rem',
          height: '3rem',
          animation: `${rotate} 1s linear infinite reverse`,
        })}
      />
    </div>
  );
};

export default Loader;
