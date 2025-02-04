import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

export const SidebarRoot = styled.div({
  display: 'none',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  background: '#fff',
  padding: '1rem',
});

export const Sidebar = (
  inProps: PropsWithChildren & {
    //
  }
) => {
  const { children } = inProps;

  return <SidebarRoot>{children}</SidebarRoot>;
};

export default Sidebar;
