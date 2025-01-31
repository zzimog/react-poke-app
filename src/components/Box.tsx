import { CSSProperties, ReactNode } from 'react';
import styled from '@emotion/styled';

type BoxProps = {
  style?: CSSProperties;
  children?: ReactNode;
};

const BoxRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  border: '1px solid black',
  borderRadius: '0.375rem',
});

const Box = (inProps: BoxProps) => {
  const { style, children } = inProps;

  return <BoxRoot style={style}>{children}</BoxRoot>;
};

export default Box;
