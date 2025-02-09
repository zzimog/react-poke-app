import { useEffect, useState } from 'react';

export default function useLocalStorage(
  storageName: string,
  initValue: string = ''
): [value: string, setItem: (newValue: string) => void, clear: () => void] {
  const [value, setValue] = useState(initValue);

  function setItem(newValue: string) {
    setValue(newValue);
    window.localStorage.setItem(storageName, newValue);
    window.dispatchEvent(new Event('storage'));
  }

  function clear() {
    setValue('');
    window.localStorage.removeItem(storageName);
    window.dispatchEvent(new Event('storage'));
  }

  function handleItem() {
    const localItem = window.localStorage.getItem(storageName);

    if (localItem !== value) {
      setValue(localItem || initValue);
    }
  }

  useEffect(() => {
    handleItem();
    window.addEventListener('storage', handleItem);

    return () => {
      window.removeEventListener('storage', handleItem);
    };
  });

  return [value, setItem, clear];
}
