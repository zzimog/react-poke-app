import { useRef } from 'react';
import Choices, { ChoicesList } from './Choices';

export const Configurator = (inProps: { data: Data }) => {
  const { data } = inProps;
  const selection = useRef(new Map<string, ChoicesList>());

  function handleChoiceChange(choiceId: string, list: ChoicesList) {
    selection.current.set(choiceId, list);
    console.log(selection);
  }

  return (
    <>
      <Choices
        max={data!.sizes[1].content.bases}
        data={data!.choices.bases}
        onChange={(list) => handleChoiceChange('bases', list)}
      />
      <Choices
        max={data!.sizes[1].content.proteins}
        data={data!.choices.proteins}
        onChange={(list) => handleChoiceChange('proteins', list)}
      />
      <Choices
        max={data!.sizes[1].content.sauces}
        data={data!.choices.sauces}
        onChange={(list) => handleChoiceChange('sauces', list)}
      />
    </>
  );
};

export default Configurator;
