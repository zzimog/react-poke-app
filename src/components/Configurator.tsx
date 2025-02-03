import { useRef, useState } from 'react';
import Choices, { ChoicesList } from './Choices';
import SizeSelector from './SizeSelector';

export type Selection = Map<string, ChoicesList>;

export const Configurator = (inProps: {
  data: Data;
  defaultSize?: number;
  onChange?: (value: Map<string, ChoicesList>) => void;
}) => {
  const { data, defaultSize = 0, onChange } = inProps;
  const [size, setSize] = useState(defaultSize);
  const selection = useRef<Map<string, ChoicesList>>(new Map());

  const { content } = data.sizes[size];
  const choices = Object.entries(content);

  function handleChoiceChange(choiceId: string, list: ChoicesList) {
    if (list.selected.size === 0) {
      selection.current.delete(choiceId);
    } else {
      selection.current.set(choiceId, list);
    }

    if (onChange) {
      onChange(selection.current);
    }
  }

  return (
    <div className="configurator">
      <SizeSelector
        data={data.sizes}
        selected={size}
        onChange={(i) => setSize(i)}
      />

      {choices.map(([choice, max], index) => {
        const choicesData = data.choices[choice];

        if (!choicesData) {
          return null;
        }

        return (
          <Choices
            key={index}
            max={max}
            data={choicesData}
            onChange={(list) => handleChoiceChange(choice, list)}
          />
        );
      })}
    </div>
  );
};

export default Configurator;
