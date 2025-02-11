import styled from '@emotion/styled';
import capitalize from '@ui/utilities/capitalize';
import Item from './Item';
import { Flex } from '@ui';

export type SelectedMap = Map<number, number>;

const Grid = styled(Flex)({
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit, minmax(max(150px, calc(25% - 1rem)), 1fr))',
  gap: '1rem',
});

export const Category = (inProps: {
  id: Key;
  items: Choice;
  max?: number;
  selected?: SelectedMap;
  onChange?: (id: Key, index: number, qta: number) => void;
}) => {
  const { id, items, max, selected = new Map(), onChange } = inProps;
  const { label, extraPrice: defaultExtraPrice, list } = items;

  const total = [...selected.values()].reduce((s, i) => s + i, 0);

  function handleQtaChange(index: number, qta: number) {
    if (
      !defaultExtraPrice &&
      max &&
      total >= max &&
      qta > (selected.get(index) || 0)
    ) {
      return;
    }

    if (onChange) {
      onChange(id, index, qta);
    }
  }

  return list.length == 0 ? null : (
    <div>
      <div className="title">
        <h1>{capitalize(label)}</h1>

        <div className="title-extra">
          <span>{max && `${total}/${max}`}</span>
        </div>
      </div>

      <Grid>
        {list.map(({ extraPrice, ...props }: Item, index) => (
          <Item
            key={index}
            {...props}
            value={selected.get(index)}
            extraPrice={extraPrice || defaultExtraPrice}
            onChange={(q) => handleQtaChange(index, q)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Category;
