import { useState } from 'react';
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
  const totalPrice = Object.entries(selected).reduce(
    (prev, [category, selected]) => {
      const max = limits[category as keyof Size['limits']];
      const defaultExtraPrice = data.categories[category].extraPrice;
      const list = data.categories[category].list;

      if (!defaultExtraPrice || !max) {
        return prev;
      }

      return (
        prev +
        Object.entries(selected)
          .reduce((prev, [index, qta]) => {
            const items = [...prev];

            for (let i = 0; i < qta; i++) {
              items.push(Number(index));
            }

            return items;
          }, [] as number[])
          .sort((a, b) => {
            const priceA = list[a].extraPrice || defaultExtraPrice || 0;
            const priceB = list[b].extraPrice || defaultExtraPrice || 0;

            return priceA > priceB ? -1 : 1;
          })
          .slice(max)
          .reduce((sum, index) => {
            const price = list[index].extraPrice || defaultExtraPrice || 0;
            return sum + price;
          }, 0)
      );
    },
    basePrice
  );

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
        totalPrice,
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
            <div className="value">{totalPrice.toFixed(2)} €</div>
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
