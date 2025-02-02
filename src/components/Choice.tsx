import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export type ChoiceProps = Item & {
  value?: number;
  min?: number;
  max?: number;
  extraQta?: number;
  onChange?: (qta: number, diff: 1 | -1, prev: number) => void;
};

const MIN_VALUE = 0;
const MAX_VALUE = 9;

const ChoiceRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0.375rem',
  overflow: 'hidden',
  background: '#ffebee',
  boxShadow: '0 0 10px #eeeeee',

  [`&.--selected`]: {
    //
  },

  [`.image`]: {
    display: 'block',
    height: 120,

    [`&-container`]: {
      margin: '0.5rem auto 0',
    },
  },

  [`.info`]: {
    padding: '0.5rem',

    [`&-name, &-extra`]: {
      fontWeight: 600,
      textAlign: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    [`&-extra`]: {
      height: 0,
      overflow: 'visible',
      fontSize: '0.8rem',
      color: '#d50000',

      [`&-qta span`]: {
        background: '#ffebee',
      },
    },
  },

  [`.qta-container`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [`.qta`]: {
      fontWeight: 600,
      userSelect: 'none',
    },

    [`.button`]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '3rem',
      height: '3rem',
      margin: '0.5rem',
      borderRadius: '50%',
      background: 'none',
      border: 0,
      transition: 'all .125s ease-in-out',

      [`&:hover`]: {
        color: '#fff',
        background: '#d50000',
      },
    },
  },
});

export const Choice = (inProps: ChoiceProps) => {
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

  function editQta(diff: 1 | -1) {
    const value = qta + diff;

    if (value < min || value > max) {
      return;
    }

    if (onChange) {
      onChange(value, diff, qta);
    }
  }

  return (
    <ChoiceRoot
      key={id}
      className={clsx({
        '--selected': qta > 0,
      })}
    >
      <div className="image-container">
        <img className="image" src={image} alt={label} />
      </div>

      <div className="info">
        <div className="info-name">{label.toUpperCase()}</div>

        {extraPrice > 0 && (
          <div className="info-extra">
            <span>EXTRA {extraPrice.toFixed(2)} €</span>
          </div>
        )}
      </div>

      <div className="qta-container">
        <button className="button" onClick={() => editQta(-1)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div className="qta">
          <span className="qta-value">{qta}</span>
        </div>
        <button className="button" onClick={() => editQta(+1)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </ChoiceRoot>
  );
};

export default Choice;
