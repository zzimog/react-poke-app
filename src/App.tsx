import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import Loader from './components/Loader';
import Box from './components/Box';
import Choices, { ChoicesList } from './components/Choices';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data | null>(null);

  const selection = useRef(new Map<string, ChoicesList>());

  function handleChoiceChange(choiceId: string, list: ChoicesList) {
    selection.current.set(choiceId, list);
    console.log(selection);
  }

  useEffect(() => {
    // simulate network throttling for loading
    const timer = setTimeout(async () => {
      const resp = await fetch('./data.json');
      const json = await resp.json();

      setData(json);
      setLoading(false);
    }, 2);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Box>
        {data?.sizes?.map((_size, index) => {
          const { size, label, price } = _size;
          const { bases, proteins, sides, crunch, sauces } = _size.content;

          function format(value: number, singular: string, plural: string) {
            return `${value} ${value > 1 ? plural : singular}`;
          }

          return (
            <Box key={index}>
              <div>{size}</div>
              <div>{label}</div>
              <div>{price.toFixed(2)} €</div>
              <div>
                <ul>
                  <li>{format(bases, 'base', 'basi')}</li>
                  <li>{format(proteins, 'proteina', 'proteine')}</li>
                  <li>{format(sides, 'condimento', 'condimenti')} </li>
                  <li>{format(crunch, 'croccante', 'croccanti')}</li>
                  <li>{format(sauces, 'salsa', 'salse')}</li>
                </ul>
              </div>
            </Box>
          );
        })}
      </Box>

      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: '#fff',
        })}
      >
        <Choices
          max={data!.sizes[1].content.bases}
          data={data!.choices.bases}
          onChange={(list) => handleChoiceChange('bases', list)}
        />
        <Choices
          max={data!.sizes[1].content.proteins}
          data={data!.choices.proteins}
          onChange={(list) => handleChoiceChange('proteins', list)}
        />
        <Choices
          max={data!.sizes[1].content.sauces}
          data={data!.choices.sauces}
          onChange={(list) => handleChoiceChange('sauces', list)}
        />
      </div>
    </div>
  );
};

export default App;
