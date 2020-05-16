import React from 'react';
import { ColumnsInitial } from './contracts';
import { createHeaderRows, getValueRenderFns } from './utils';


export interface IDataGridProps<TData> {
  columns: ColumnsInitial<TData>;
  data: TData[];
}

export function DataGrid<TData>({ columns, data }: IDataGridProps<TData>) {
  const headerRows = createHeaderRows(columns);
  const valueRenders = getValueRenderFns(columns);
  const idsDataColumn = Object.keys(valueRenders);
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerRows.map((row, index) => (
          <tr key={index.toString()}>
            {row.map((column) => (
              <th style={{ border: 'solid 1px' }} key={column.id} colSpan={column.colspan} rowSpan={column.rowspan}>{column.title}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.map((row, index) =>
          <tr key={index.toString()}>
            {idsDataColumn.map((columnId) =>
              <td style={{ border: 'solid 1px' }} key={columnId}>{valueRenders[columnId](row)}</td>)}
          </tr>)}
      </tbody>
    </table>
  );
}
