import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Loader from './components/Loader';
import { Configurator, Selection } from './components/Configurator';
import Sidebar from './components/Sidebar';

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
  const [selection, setSelection] = useState<Selection>(new Map());

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
      <Sidebar>
        <pre>{JSON.stringify(selection.values(), null, '  ')}</pre>
      </Sidebar>

      <Configurator
        data={data}
        defaultSize={1}
        onConfirm={(s) => {
          console.log(s);
          setSelection(s);
        }}
      />
    </Root>
  );
};

export default App;
