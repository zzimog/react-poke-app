import { CSSProperties, useState } from 'react';
import { css } from '@emotion/react';
import Box from './Box';

type ChoiceProps = {
  id: string;
  label: string;
  image: string;
  extraPrice?: number;
  onChange?: (id: string, qta: number, diff: number) => void;
};

type ChoicesProps = {
  max?: number;
  data: {
    label: string;
    extraPrice?: number;
    list: ChoiceProps[];
  };
};

const Choice = (inProps: ChoiceProps) => {
  const { id, label, image, extraPrice, onChange } = inProps;
  const [qta, setQta] = useState(0);

  function editQta(amount: number) {
    const value = qta + amount;

    if (value < 0 || value > 9) {
      return;
    }

    setQta(value);

    if (onChange) {
      onChange(id, value, amount);
    }
  }

  return (
    <Box key={id}>
      <div
        css={css({
          width: '100%',
          height: 150,
        })}
      >
        <img src={image} alt={label} />
      </div>

      <div
        css={css({
          padding: '1rem',
        })}
      >
        <div css={css({ textTransform: 'capitalize' })}>
          <span>{label}</span>
        </div>

        {extraPrice && (
          <div>
            <span>Extra +{extraPrice?.toFixed(2)} €</span>
          </div>
        )}

        <div
          css={css({
            display: 'flex',
            justifyContent: 'space-between',
          })}
        >
          <button onClick={() => editQta(-1)}>
            <span>-</span>
          </button>
          <span>{qta}</span>
          <button onClick={() => editQta(+1)}>
            <span>+</span>
          </button>
        </div>
      </div>
    </Box>
  );
};

const Choices = ({ max, data }: ChoicesProps) => {
  const { label, list } = data;
  const defaultExtraPrice = data.extraPrice;

  const [current, setCurrent] = useState([]);

  const boxStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '0.5rem',
    padding: '1rem',
  };

  function handleChange(id: string, _qta: number, diff: number) {
    const newValue = current + diff;
    console.log(id, diff);

    if (max && newValue > max) {
      return;
    }

    setCurrent(newValue);
  }

  return (
    <Box>
      <h1 style={{ textTransform: 'capitalize' }}>
        <span>{label}</span>
        {max && <span>{`${current}/${max}`}</span>}
      </h1>

      <div style={boxStyle}>
        {list.map((entry, index) => {
          const { extraPrice } = entry;
          const props = {
            ...entry,
            extraPrice: extraPrice || defaultExtraPrice,
            onChange: handleChange,
          };

          return <Choice key={index} {...props} />;
        })}
      </div>
    </Box>
  );
};

export default Choices;
