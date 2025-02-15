import useLocalStorage from '@utils/useLocalStorage';

function useBasket<T>() {
  const emptyBasket = <T>[];

  const [basketString, setBasket, clearBasket] = useLocalStorage(
    'basket',
    JSON.stringify(emptyBasket)
  );

  const basket = JSON.parse(basketString);
  const list = basket as BasketRow<T>[];

  function add(item: BasketRow<T>) {
    const newBasket = [...basket, item];
    const newString = JSON.stringify(newBasket);
    setBasket(newString);
  }

  function remove(index: number) {
    const newBasket = basket.filter((_: never, i: number) => i !== index);
    const newString = JSON.stringify(newBasket);
    setBasket(newString);
  }

  return {
    list,
    add,
    remove,
    clear: clearBasket,
  };
}

export default useBasket;
