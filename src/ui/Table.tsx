import { ReactElement } from 'react';
import styled from '@emotion/styled';

type TableProps<T> = {
  data: T[];
  headers?: string[];
  render: (entry: T, index: number) => ReactElement;
};

const TableRoot = styled.table({
  background: 'red',

  [`& .table-row`]: {
    background: 'orange',
  },
});

const Table = <T,>(inProps: TableProps<T>) => {
  const { data, headers, render } = inProps;

  if (data.length === 0) {
    return null;
  }

  return (
    <TableRoot className="table">
      {headers && (
        <thead>
          <tr>
            {headers.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((entry, index) => (
          <tr key={index} className="table-row">
            {render(entry, index)}
          </tr>
        ))}
      </tbody>
    </TableRoot>
  );
};

export default Table;
