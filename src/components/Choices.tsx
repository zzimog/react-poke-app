import { CSSProperties, useState } from 'react';
import capitalize from '@ui/capitalize';
import Box from './Box';
import Choice from './Choice';

export type ChoicesList = {
  selected: Map<number, number>;
  items: number[];
  extra: number[];
};

export type ChoicesProps = {
  data: Choice;
  max?: number;
  onChange?: (list: ChoicesList) => void;
};

export const Choices = (inProps: ChoicesProps) => {
  const { data, max, onChange } = inProps;
  const { label, extraPrice: defaultExtraPrice, list } = data;
  const allowExtra = max && defaultExtraPrice && defaultExtraPrice > 0;

  const [selected, setSelected] = useState({
    items: new Map<number, number>(),
    total: 0,
  });

  const boxStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(max(150px, 100%/5), 1fr))',
    gap: '1rem',
  };

  function getList(): ChoicesList {
    const entries = [...selected.items.entries()];
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
      selected: selected.items,
      items: max ? sorted.slice(0, max) : sorted,
      extra: max ? sorted.slice(max) : [],
    };
  }

  function handleChange(index: number, qta: number, diff: 1 | -1) {
    const newItems = new Map(selected.items);
    const newTotal = selected.total + diff;

    if (max && !allowExtra) {
      if (newTotal > max || newTotal < 0) {
        return;
      }
    }

    if (!qta || qta === 0) {
      newItems.delete(index);
    } else {
      newItems.set(index, qta);
    }

    setSelected({
      items: newItems,
      total: newTotal,
    });

    if (onChange) {
      const list = getList();
      onChange(list);
    }
  }

  return (
    <Box>
      <div className="title">
        <h1>{capitalize(label)}</h1>

        <div className="title-extra">
          {max && `${selected.total}/${max}`}
          {max && selected.total > max && (
            <span>
              +
              {getList()
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

      <div style={boxStyle}>
        {list.map((entry: Item, index) => {
          const { extraPrice, ...props } = entry;

          return (
            <Choice
              key={index}
              {...props}
              value={selected.items.get(index)}
              extraPrice={extraPrice || defaultExtraPrice}
              onChange={(q, d) => handleChange(index, q, d)}
            />
          );
        })}
      </div>
    </Box>
  );
};

export default Choices;
