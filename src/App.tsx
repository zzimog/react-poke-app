import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Wrapper from '@ui/Wrapper';
import Loader from './components/Loader';
import Composer from './components/composer/Composer';
import BasketSummary from './components/basket/BasketSummary';
import useBasket from './components/basket/useBasket';
import BasketList from './components/basket/BasketList';

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
  const { add: addToBasket } = useBasket<BasketItem>();

  function handleSubmit(data: ComposerData) {
    const { size, selected } = data;
    const price = data.totalPrice;

    const item = {
      price,
      qta: 1,
      item: {
        size,
        selected,
      },
    };

    addToBasket(item);
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

      <BasketSummary />
      <BasketList data={data} />

      <Composer data={data} onSubmit={handleSubmit} />
    </Root>
  );
};

export default App;
