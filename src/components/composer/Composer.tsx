import { useRef, useState } from 'react';
import Category from './Category';
import SizeSelector from './SizeSelector';
import styled from '@emotion/styled';
import { Flex, Wrapper } from '@ui';
import Button from '@ui/Button';

const ComposerRoot = styled(Flex)({
  padding: '1rem',

  [`& .summary`]: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    background: '#fff',
    borderTop: '1px solid lightgray',

    [`&-wrapper`]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
    },

    [`&-price`]: {
      [`& .label`]: {
        fontSize: '0.8rem',
        fontWeight: 400,
      },
      [`& .value`]: {
        fontWeight: 800,
      },
    },
  },
});

const Composer = (inProps: {
  data: Data;
  onSubmit?: (data: ComposerData) => void;
}) => {
  const { data, onSubmit } = inProps;

  const [size, setSize] = useState<number>(1);
  const [selected, setSelected] = useState<MapSelected>({});

  const limits = data.sizes[size].limits;
  const categories = Object.entries(limits);

  const basePrice = data.sizes[size].price;
  const totalPrice = useRef<number>(basePrice);

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
        <Wrapper className="summary-wrapper">
          <div className="summary-price">
            <div className="label">Totale</div>
            <div className="value">{totalPrice.current.toFixed(2)} €</div>
          </div>

          <Button onClick={handleSubmit}>
            <span>Aggiungi all'ordine</span>
          </Button>
        </Wrapper>
      </div>
    </ComposerRoot>
  );
};

export default Composer;
