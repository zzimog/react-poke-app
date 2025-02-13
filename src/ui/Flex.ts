import styled from '@emotion/styled';
import type { Property } from 'csstype';

const Flex = styled.div<{
  direction?: Property.FlexDirection;
}>((props) => ({
  display: 'flex',
  flexDirection: props.direction || 'column',
  gap: '1rem',
}));

export default Flex;
