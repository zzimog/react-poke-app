import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const ButtonRoot = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 'none',
  cursor: 'pointer',
});

const Button = (inProps: PropsWithChildren) => {
  const { children, ...props } = inProps;

  return <ButtonRoot {...props}>{children}</ButtonRoot>;
};

export default Button;
