import styled from '@emotion/styled';
import clsx from 'clsx';
import { Flex } from '@ui';
import capitalize from '@ui/utilities/capitalize';
import Item from './Item';

const CategoryRoot = styled(Flex)({
  [`& .totalQta`]: {
    marginRight: '0.5rem',

    [`&.--has-extra`]: {
      color: 'orange',
    },
  },

  [`& .grid`]: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(max(150px, calc(25% - 1rem)), 1fr))',
    gap: '1rem',
  },
});

const Category = (inProps: {
  id: Key;
  items: Category;
  max?: number;
  selected?: MapItemQta;
  onChange?: (id: Key, index: number, qta: number) => void;
}) => {
  const { id, items, max, selected = {}, onChange } = inProps;
  const { label, extraPrice: defaultExtraPrice, list } = items;

  const total = Object.values(selected).reduce((s, i) => s + i, 0);

  const extraPrice = Object.entries(selected)
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
    }, 0);

  function handleQtaChange(index: number, qta: number) {
    if (
      !defaultExtraPrice &&
      max &&
      total >= max &&
      qta > (selected[index] || 0)
    ) {
      return;
    }

    if (onChange) {
      onChange(id, index, qta);
    }
  }

  return list.length == 0 ? null : (
    <CategoryRoot>
      <div className="header">
        <h1>{capitalize(label)}</h1>

        {max && (
          <h3>
            <span className={clsx('totalQta', total > max && '--has-extra')}>
              {`${total}/${max}`}
            </span>

            {extraPrice > 0 && <span>+ {extraPrice.toFixed(2)} €</span>}
          </h3>
        )}
      </div>

      <div className="grid">
        {list.map(({ extraPrice, ...props }: Item, index) => (
          <Item
            key={index}
            {...props}
            value={selected[index]}
            extraPrice={extraPrice || defaultExtraPrice}
            onChange={(q) => handleQtaChange(index, q)}
          />
        ))}
      </div>
    </CategoryRoot>
  );
};

export default Category;
