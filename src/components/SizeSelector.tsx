import styled from '@emotion/styled';
import { css } from '@emotion/react';
import clsx from 'clsx';
import Card from '@ui/Card';
import mediaQuery from '@ui/mediaQuery';

const SizesRoot = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  padding: '0 1rem',

  [mediaQuery('sm')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const SizeRoot = styled(Card)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  cursor: 'pointer',

  [mediaQuery('sm')]: {
    flexDirection: 'column',
  },

  [mediaQuery('lg')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  [`&.--selected`]: {
    outline: '3px solid #ef5350',
  },

  [`& .image-container`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: '0 0 128px',

    [`.image`]: {
      objectFit: 'contain',
      userSelect: 'none',
    },
  },

  [`& .info`]: {
    flex: '1 1 auto',

    [mediaQuery('lg')]: {
      paddingLeft: 0,
    },

    [`&-name`]: {
      fontWeight: 800,
    },

    [`&-price`]: {
      color: '#b71c1c',
      fontSize: '1.6rem',
      fontWeight: 300,
    },

    [`&-list`]: {
      marginTop: '1rem',

      [`li`]: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap',

        [`&::before`]: {
          content: '""',
          display: 'block',
          background: '#ef5350',
          width: '0.5rem',
          height: '0.5rem',
        },
      },
    },
  },
});

export const SizeSelector = (inProps: {
  data?: Size[];
  selected?: number;
  onChange?: (index: number) => void;
}) => {
  const { data = [], selected = 0, onChange } = inProps;

  const imageSize = {
    s: 96,
    m: 112,
    l: 128,
  };

  function handleChange(index: number) {
    if (onChange) {
      onChange(index);
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
            data-size={size}
          >
            <div className="image-container">
              <img
                css={css({
                  width: imageSize[size],
                  height: imageSize[size],
                })}
                className="image"
                src="./assets/poke.png"
              />
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
