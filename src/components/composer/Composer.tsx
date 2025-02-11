import { useState } from 'react';
import Category from './Category';
import SizeSelector from './SizeSelector';

type ComposerProps = {
  data: Data;
};

type MapItemQta = Map<number, number>;

type MapSelected = Map<Key, MapItemQta>;

const Composer = (inProps: ComposerProps) => {
  const { data } = inProps;

  const [size, setSize] = useState(1);
  const [selected, setSelected] = useState<MapSelected>(new Map());

  const limits = data.sizes[size].limits;
  const categories = Object.entries(limits);

  function handleQtaChange(id: Key, index: number, qta: number) {
    setSelected((prev) => {
      const selected = new Map(prev);
      const category = selected.get(id) || (new Map() as MapItemQta);

      if (qta > 0) {
        category.set(index, qta);
      } else {
        category.delete(index);
      }

      if (category.size > 0) {
        selected.set(id, category);
      } else {
        selected.delete(id);
      }

      return selected;
    });
  }

  console.log(selected);

  return (
    <div>
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
            selected={selected.get(id)}
            onChange={handleQtaChange}
          />
        );
      })}
    </div>
  );
};

export default Composer;
