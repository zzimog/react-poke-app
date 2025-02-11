import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Loader from './components/Loader';
import Composer from './components/composer/Composer';

const Root = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1rem 0',
});

const App = () => {
  const [data, setData] = useState<Data | undefined>();

  useEffect(() => {
    // simulate network throttling for loading
    const timer = setTimeout(async () => {
      const resp = await fetch('./data.json');
      const json = await resp.json();

      setData(json);
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <Root>
      <Composer data={data} />
    </Root>
  );
};

export default App;
