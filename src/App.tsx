import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Wrapper from '@ui/Wrapper';
import Loader from './components/Loader';
import Composer from './components/composer/Composer';

const Root = styled(Wrapper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1rem 0 5rem',

  [`& .logo img`]: {
    width: 'auto',
    height: 200,
    margin: 'auto',
  },
});

const App = () => {
  const [data, setData] = useState<Data | undefined>();

  function handleSubmit(data: ComposerData) {
    alert(JSON.stringify(data, null, '  '));
  }

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
      <div className="logo">
        <img src="./assets/logo.png" alt="Poke-A-Booo" />
      </div>

      <Composer data={data} onSubmit={handleSubmit} />
    </Root>
  );
};

export default App;
