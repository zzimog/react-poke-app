import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Loader from './components/Loader';
import SizeSelector from './components/SizeSelector';
import Configurator from './components/Configurator';

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
  const [size, setSize] = useState(1);

  function handleSizeChange(index: number) {
    setSize(index);
  }

  useEffect(() => {
    // simulate network throttling for loading
    const timer = setTimeout(async () => {
      const resp = await fetch('./data.json');
      const json = await resp.json();

      setData(json);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <Root>
      <SizeSelector
        data={data.sizes}
        selected={size}
        onChange={handleSizeChange}
      />
      <Configurator data={data} size={size} />
    </Root>
  );
};

export default App;
