import styled from '@emotion/styled';

const ButtonRoot = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  background: '#000',
  border: 0,
  borderRadius: '9999px',
  padding: '0.8rem 1rem',
  outline: 'none',
  cursor: 'pointer',
  transition: 'all .1s ease-in-out',

  [`&:hover`]: {
    background: '#333',
  },
});

export default ButtonRoot;
