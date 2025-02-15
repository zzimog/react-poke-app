import { capitalize } from '@ui/utilities';
import useBasket from './useBasket';

const BasketList = (inProps: { data: Data }) => {
  const { data } = inProps;
  const { list, clear } = useBasket<BasketItem>();

  return (
    <div>
      <button onClick={clear}>clear</button>

      <table>
        <tbody>
          {list.map((row: BasketRow<BasketItem>, index) => {
            const { item, qta, price } = row;
            const { size, selected } = item;

            return (
              <tr key={index}>
                <td>
                  <div>
                    <b>{data.sizes[size].label.toUpperCase()}</b>
                  </div>

                  <ul>
                    {Object.entries(selected).map(
                      ([category, selected], index) => {
                        const { label, list } = data.categories[category];

                        return (
                          <li key={index}>
                            <b>{label.toUpperCase()}</b>
                            <ul>
                              {Object.entries(selected).map(
                                ([idx, qta], index) => {
                                  const { label } = list[Number(idx)];

                                  return (
                                    <li key={index}>{`${capitalize(
                                      label
                                    )}: ${qta}`}</li>
                                  );
                                }
                              )}
                            </ul>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </td>
                <td>{qta}pz</td>
                <td>{price.toFixed(2)} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasketList;
