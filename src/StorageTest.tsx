import useLocalStorage from './utils/useLocalStorage';

export const StorageTest = () => {
  const [val, setVal, clear] = useLocalStorage('hello', 'world');

  return (
    <div className="container">
      <button onClick={clear}>Clear</button>
      <br />
      <input type="text" onChange={(e) => setVal(e.target.value)} value={val} />
      <br />
      New value: {val}
    </div>
  );
};

export default StorageTest;
