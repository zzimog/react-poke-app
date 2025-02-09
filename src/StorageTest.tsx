import useLocalStorage from './utils/useLocalStorage';

export const Test = () => {
  const [val, setVal, clear] = useLocalStorage('hello', 'world');

  function handleChange(target: HTMLInputElement) {
    const { value } = target;
    setVal(value);
  }

  return (
    <div className="container">
      <button onClick={clear}>Clear</button>
      <br />
      <input type="text" onChange={(e) => handleChange(e.target)} value={val} />
      <br />
      New value: {val}
    </div>
  );
};

export default Test;
