import styled from '@emotion/styled';
import { useState } from 'react';
import clsx from 'clsx';
import Card from '@ui/Card';

const SizesRoot = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(max(100px, 100%/4), 1fr))',
  gap: '1rem',
});

const SizeRoot = styled(Card)({
  flexDirection: 'row',
  alignItems: 'center',
  cursor: 'pointer',

  [`&.--selected`]: {
    outline: '3px solid #ef5350',
  },

  [`& .image-container`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 128px',
    height: '128px',

    [`.image`]: {
      color: '#b71c1c',
      fontSize: '96px',
      fontWeight: 900,
    },
  },

  [`& .info`]: {
    padding: '1rem',
    flex: '1 1 auto',

    [`&-name`]: {
      fontWeight: 800,
    },

    [`&-price`]: {
      color: '#b71c1c',
      fontSize: '1.6rem',
      fontWeight: 300,
    },

    [`&-list li`]: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',

      [`&::before`]: {
        content: '""',
        display: 'block',
        background: '#ef5350',
        width: '0.5rem',
        height: '0.5rem',
      },
    },
  },
});

export const SizeSelector = (inProps: {
  data?: Size[];
  selected?: number;
  onChange?: (index: number) => void;
}) => {
  const { data = [], selected: initSelected = 0, onChange } = inProps;
  const [selected, setSelected] = useState(initSelected);

  function handleChange(index: number) {
    setSelected(index);

    if (onChange) {
      onChange(selected);
    }
  }

  return (
    <SizesRoot>
      {data.map((_size, index) => {
        const { size, label, price } = _size;
        const { bases, proteins, sides, crunch, sauces } = _size.content;

        function format(value: number, singular: string, plural: string) {
          return `${value} ${value > 1 ? plural : singular}`;
        }

        return (
          <SizeRoot
            key={index}
            className={clsx({
              '--selected': index === selected,
            })}
            onClick={() => handleChange(index)}
          >
            <div className="image-container">
              <span className="image">{size.toUpperCase()}</span>
            </div>

            <div className="info">
              <div className="info-name">
                <span>{label.toUpperCase()}</span>
              </div>

              <div className="info-price">
                <span>{price.toFixed(2)} €</span>
              </div>

              <ul className="info-list">
                <li>{format(bases, 'base', 'basi')}</li>
                <li>{format(proteins, 'proteina', 'proteine')}</li>
                <li>{format(sides, 'condimento', 'condimenti')} </li>
                <li>{format(crunch, 'croccante', 'croccanti')}</li>
                <li>{format(sauces, 'salsa', 'salse')}</li>
              </ul>
            </div>
          </SizeRoot>
        );
      })}
    </SizesRoot>
  );
};

export default SizeSelector;
