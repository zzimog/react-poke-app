import { useState } from 'react';
import styled from '@emotion/styled';
import capitalize from '@ui/utilities/capitalize';
import Choice from './Choice';
import { Flex } from '@/ui';

export type SelectedMap = Map<number, number>;

export type ChoicesList = {
  selected: SelectedMap;
  items: number[];
  extra: number[];
};

const Grid = styled(Flex)({
  display: 'grid',
  gridTemplateColumns:
    'repeat(auto-fit, minmax(max(150px, calc(25% - 1rem)), 1fr))',
  gap: '1rem',
});

export const Choices = (inProps: {
  data: Choice;
  max?: number;
  onChange?: (list: ChoicesList) => void;
}) => {
  const { data, max, onChange } = inProps;
  const { label, extraPrice: defaultExtraPrice, list } = data;
  const allowExtra = max && defaultExtraPrice && defaultExtraPrice > 0;

  const [selected, setSelected] = useState<SelectedMap>(new Map());

  function getTotal() {
    return [...selected.values()].reduce((s, q) => s + q, 0);
  }

  function getList(selected: SelectedMap) {
    const entries = [...selected.entries()];
    const selectedList = [];

    // explode map
    for (const [idx, qta] of entries) {
      for (let i = 0; i < qta; i++) {
        const item = list[idx];
        item.extraPrice = item.extraPrice || defaultExtraPrice;
        selectedList.push(idx);
      }
    }

    // sort by extra price value
    const sorted = selectedList.sort((idxA, idxB) => {
      const a = list[idxA];
      const b = list[idxB];

      return a.extraPrice! <= b.extraPrice! ? 1 : -1;
    });

    return {
      selected: selected,
      items: max ? sorted.slice(0, max) : sorted,
      extra: max ? sorted.slice(max) : [],
    };
  }

  function handleChange(index: number, qta: number, diff: 1 | -1) {
    const newItems = new Map(selected);
    const newTotal = getTotal() + diff;

    if (max && !allowExtra) {
      if (newTotal > max || newTotal < 0) {
        return;
      }
    }

    if (!qta || qta == 0) {
      newItems.delete(index);
    } else {
      newItems.set(index, qta);
    }

    setSelected(newItems);

    if (onChange) {
      const list = getList(newItems);
      onChange(list);
    }
  }

  return list.length == 0 ? null : (
    <div>
      <div className="title">
        <h1>{capitalize(label)}</h1>

        <div className="title-extra">
          {max && `${getTotal()}/${max}`}
          {max && getTotal() > max && (
            <span>
              +
              {getList(selected)
                .extra.reduce((sum, idx) => {
                  const price = list[idx].extraPrice || defaultExtraPrice || 0;
                  return sum + price;
                }, 0)
                .toFixed(2)}
              €
            </span>
          )}
        </div>
      </div>

      <Grid>
        {list.map(({ extraPrice, ...props }: Item, index) => (
          <Choice
            key={index}
            {...props}
            value={selected.get(index)}
            extraPrice={extraPrice || defaultExtraPrice}
            onChange={(q, d) => handleChange(index, q, d)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Choices;
