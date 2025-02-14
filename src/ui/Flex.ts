import validProp from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import type { Property } from 'csstype';

const Flex = styled('div', {
  shouldForwardProp: (prop) => validProp(prop) && prop !== 'direction',
})<{
  direction?: Property.FlexDirection;
}>((props) => ({
  display: 'flex',
  flexDirection: props.direction || 'column',
  gap: '1rem',
}));

export default Flex;
