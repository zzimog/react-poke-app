import { useEffect, useState } from 'react';
import Box from './components/Box';
import Choices from './components/Choices';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('./data.json');
      const json = await resp.json();

      setData(json);
      setLoading(false);
    }

    // simulate network throttling for loading
    const timer = setTimeout(() => {
      fetchData();
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <h1>Fetching data...</h1>;
  }

  return (
    <div>
      <Choices max={data!.sizes[1].content.bases} data={data!.choices.bases} />
      <Choices
        max={data!.sizes[1].content.proteins}
        data={data!.choices.proteins}
      />
    </div>
  );

  return (
    <Box>
      {data?.sizes?.map((_size, index) => {
        const { size, label, image, price } = _size;
        const { bases, proteins, sides, crunch, sauces } = _size.content;

        function format(value: number, singular: string, plural: string) {
          return `${value} ${value > 1 ? plural : singular}`;
        }

        return (
          <Box key={index}>
            <div>
              <img src={image} alt={`${label} poke`} />
            </div>
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
  );
};

export default App;
