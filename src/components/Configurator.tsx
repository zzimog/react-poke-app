import { useRef } from 'react';
import Choices, { ChoicesList } from './Choices';

export const Configurator = (inProps: { data: Data; size: number }) => {
  const { data, size = 0 } = inProps;
  const selection = useRef(new Map<string, ChoicesList>());

  const { content } = data.sizes[size];
  const currentContent = Object.entries(content);

  function handleChoiceChange(choiceId: string, list: ChoicesList) {
    selection.current.set(choiceId, list);
    console.log(selection);
  }

  return currentContent.map(([content, max], index) => {
    const choicesData = data.choices[content];

    if (!choicesData) {
      return null;
    }

    return (
      <Choices
        key={index}
        max={max}
        data={choicesData}
        onChange={(list) => handleChoiceChange(content, list)}
      />
    );
  });
};

export default Configurator;
