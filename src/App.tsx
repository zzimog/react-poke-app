import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Loader from './components/Loader';
import SizeSelector from './components/SizeSelector';
import Configurator from './components/Configurator';

const App = () => {
  const [data, setData] = useState<Data | undefined>();

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
    <div
      css={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '1rem 0',
        background: '#fff',
      })}
    >
      <SizeSelector data={data.sizes} selected={1} />

      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        })}
      >
        <Configurator data={data} />
      </div>
    </div>
  );
};

export default App;
