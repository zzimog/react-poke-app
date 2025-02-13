import { useState } from 'react';
import Category from './Category';
import SizeSelector from './SizeSelector';
import styled from '@emotion/styled';
import { Flex, Wrapper } from '@ui';

const ComposerRoot = styled(Flex)({
  padding: '1rem',

  [`& .summary`]: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    background: '#fff',

    [`& ${Wrapper}`]: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
    },
  },
});

const Composer = (inProps: {
  data: Data;
  onSubmit?: (data: ComposerData) => void;
}) => {
  const { data, onSubmit } = inProps;

  const [size, setSize] = useState(1);
  const [selected, setSelected] = useState<MapSelected>({});

  const limits = data.sizes[size].limits;
  const categories = Object.entries(limits);

  function handleQtaChange(id: Key, index: number, qta: number) {
    setSelected((prev) => {
      const selected = { ...prev };
      const category = { ...selected[id] };

      if (qta > 0) {
        category[index] = qta;
      } else {
        delete category[index];
      }

      if (Object.keys(category).length > 0) {
        selected[id] = category;
      } else {
        delete selected[id];
      }

      return selected;
    });
  }

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({
        size,
        selected,
      });
    }
  }

  return (
    <ComposerRoot>
      <SizeSelector
        sizes={data.sizes}
        selected={size}
        onChange={(i) => setSize(i)}
      />

      {categories.map(([category, max], index) => {
        const id = category;
        const items = data.categories[category];

        return !items ? null : (
          <Category
            key={index}
            id={id}
            items={items}
            max={max}
            selected={selected[id]}
            onChange={handleQtaChange}
          />
        );
      })}

      <div className="summary">
        <Wrapper>
          <div className="summary-price">
            <h3>Totale: 0.00 €</h3>
          </div>

          <button onClick={handleSubmit}>
            <h3>Conferma</h3>
          </button>
        </Wrapper>
      </div>
    </ComposerRoot>
  );
};

export default Composer;
