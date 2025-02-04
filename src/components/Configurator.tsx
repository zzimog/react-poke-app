import { useId, useRef, useState } from 'react';
import styled from '@emotion/styled';
import SizeSelector from './SizeSelector';
import Choices, { ChoicesList } from './Choices';

export type Selection = Map<string, ChoicesList>;

const ConfiguratorRoot = styled.div({
  padding: '1rem',
});

export const Configurator = (inProps: {
  data: Data;
  defaultSize?: number;
  onConfirm?: (selection: Map<string, ChoicesList>) => void;
}) => {
  const rootId = useId() + 'configurator';
  const { data, defaultSize = 0, onConfirm } = inProps;

  const [size, setSize] = useState(defaultSize);
  const selection = useRef<Map<string, ChoicesList>>(new Map());

  const maxes = data.sizes[size].content;
  const choices = Object.entries(maxes);

  function handleChoiceChange(choiceId: string, list: ChoicesList) {
    if (list.selected.size === 0) {
      selection.current.delete(choiceId);
    } else {
      selection.current.set(choiceId, list);
    }
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm(selection.current);
    }
  }

  return (
    <ConfiguratorRoot id={rootId}>
      <h1>Configurator</h1>

      <SizeSelector
        data={data.sizes}
        selected={size}
        onChange={(i) => setSize(i)}
      />

      {choices.map(([choice, max], index) => {
        const choicesData = data.choices[choice];

        return !choicesData ? null : (
          <Choices
            key={index}
            max={max}
            data={choicesData}
            onChange={(list) => handleChoiceChange(choice, list)}
          />
        );
      })}

      <button onClick={handleConfirm}>
        <span>Conferma</span>
      </button>
    </ConfiguratorRoot>
  );
};

export default Configurator;
