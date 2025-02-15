import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import Button from '@ui/Button';
import useBasket from './useBasket';

const BasketSummaryRoot = styled(Button)({
  gap: '0.5rem',
  width: 'fit-content',
  color: '#000',
  background: '#fff',
  fontSize: '1.2rem',

  [`&:hover`]: {
    background: '#eeeeee',
  },
});

const BasketSummary = () => {
  const { list } = useBasket<BasketItem>();

  return (
    <BasketSummaryRoot>
      <FontAwesomeIcon icon={faBasketShopping} />
      <div className="count">{list.length}</div>
    </BasketSummaryRoot>
  );
};

export default BasketSummary;
