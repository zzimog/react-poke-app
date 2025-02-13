import { useEffect, useState } from 'react';

export default function useLocalStorage(
  storageName: string,
  initValue: string = ''
): [value: string, setItem: (newValue: string) => void, clear: () => void] {
  const [value, setValue] = useState(() => {
    const localItem = window.localStorage.getItem(storageName);
    return localItem || initValue;
  });

  function setItem(newValue: unknown) {
    if (typeof newValue !== 'string') {
      newValue = JSON.stringify(newValue);
    }

    if (newValue !== value) {
      setValue(`${newValue}`);
      window.localStorage.setItem(storageName, `${newValue}`);
      window.dispatchEvent(new Event('localStorageChange'));
    }
  }

  function clear() {
    setValue(initValue);
    window.localStorage.removeItem(storageName);
    window.dispatchEvent(new Event('localStorageChange'));
  }

  function handleItem() {
    const localItem = window.localStorage.getItem(storageName);

    if (localItem !== value) {
      setValue(localItem || initValue);
    }
  }

  useEffect(() => {
    window.addEventListener('storage', handleItem);
    window.addEventListener('localStorageChange', handleItem);

    return () => {
      window.removeEventListener('storage', handleItem);
      window.removeEventListener('localStorageChange', handleItem);
    };
  });

  return [value, setItem, clear];
}
