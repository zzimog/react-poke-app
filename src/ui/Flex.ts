import styled from '@emotion/styled';
import type { Property } from 'csstype';

export type FlexProps = {
  direction?: Property.FlexDirection;
};

export const Flex = styled.div<FlexProps>((props) => ({
  display: 'flex',
  flexDirection: props.direction || 'column',
  gap: '1rem',
}));

export default Flex;
