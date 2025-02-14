import styled from '@emotion/styled';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Card, Flex, Button } from '@ui';

const MIN_VALUE = 0;
const MAX_VALUE = 9;

export const ItemRoot = styled(Card)({
  flexDirection: 'column',
  userSelect: 'none',

  [`&.--selected`]: {
    //
  },

  [`.image`]: {
    objectFit: 'contain',

    [`&-container`]: {
      width: 128,
      height: 128,
      margin: '0 auto',
    },
  },

  [`.info`]: {
    padding: '0.5rem',
    flex: '1 0 auto',

    [`&-name, &-extra`]: {
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    [`&-name`]: {
      fontWeight: 800,
    },

    [`&-extra`]: {
      overflow: 'visible',
      fontWeight: 600,
      fontSize: '0.8rem',
      color: '#d50000',

      [`&-qta span`]: {
        background: '#ffebee',
      },
    },
  },

  [`& .qta`]: {
    justifyContent: 'space-between',
    alignItems: 'center',

    [`&-value`]: {
      fontWeight: 400,
      userSelect: 'none',
    },

    [`&-btn`]: {
      width: '2rem',
      height: '2rem',
      color: '#000',
      background: 'none',

      [`&:hover`]: {
        color: '#fff',
        background: '#d50000',
      },
    },
  },
});

export const Item = (
  inProps: Item & {
    value?: number;
    min?: number;
    max?: number;
    extraQta?: number;
    onChange?: (qta: number) => void;
  }
) => {
  const {
    id,
    label,
    image,
    value: qta = 0,
    min = MIN_VALUE,
    max = MAX_VALUE,
    extraPrice = 0,
    onChange,
  } = inProps;

  function handleQtaChange(diff: 1 | -1) {
    const value = qta + diff;

    if (value < min || value > max) {
      return;
    }

    if (onChange) {
      onChange(value);
    }
  }

  return (
    <ItemRoot
      key={id}
      className={clsx({
        '--selected': qta > 0,
      })}
    >
      {image && (
        <div className="image-container">
          <img className="image" src={image} alt={label} />
        </div>
      )}

      <div className="info">
        <div className="info-name">
          <span>{label.toUpperCase()}</span>
        </div>

        {extraPrice > 0 && (
          <div className="info-extra">
            <span>EXTRA {extraPrice.toFixed(2)} €</span>
          </div>
        )}
      </div>

      <Flex direction="row" className="qta">
        <Button className="qta-btn" onClick={() => handleQtaChange(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>

        <div className="qta-value">
          <span className="qta-value">{qta}</span>
        </div>

        <Button className="qta-btn" onClick={() => handleQtaChange(+1)}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Flex>
    </ItemRoot>
  );
};

export default Item;
