import React from 'react';
import { classnames } from '@bem-react/classnames';
import { IClassNameProps } from '@bem-react/core';
import { useHotKeys } from '../../hooks/useHotKeys/useHotKeys';
import { ColumnsInitial } from './contracts';
import { createHeaderRows, getClassName, getValueRenderFns } from './utils';
import { DataGridColumn } from './__column/datagrid__column';
import './datagrid.scss';


const dataGridBlock = getClassName();

export interface IDataGridProps<TData> extends IClassNameProps {
  columns: ColumnsInitial<TData>;
  data: TData[];
}

export function DataGrid<TData>({ columns, data, className }: IDataGridProps<TData>) {
  const headerRows = createHeaderRows(columns);
  const valueRenders = getValueRenderFns(columns);
  const idsDataColumn = Object.keys(valueRenders);
  const [isFocused, setFocused] = React.useState(false);
  const focusHandler = React.useCallback(() => setFocused(!isFocused), [isFocused]);
  const hotKeys = useHotKeys(isFocused);

  React.useEffect(() => {
    hotKeys.bind(['Control', 'F1'], () => alert('Help'));
  }, []);

  return (
    <table className={classnames(dataGridBlock, className)} tabIndex={0} onFocus={focusHandler} onBlur={focusHandler}>
      <thead>
        {headerRows.map((row, index) => (
          <tr key={index.toString()}>
            {row.map((column) => (
              <DataGridColumn
                key={column.id}
                colSpan={column.colspan}
                rowSpan={column.rowspan}
                header
              >
                {column.title}
              </DataGridColumn>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.map((row, index) =>
          <tr key={index.toString()}>
            {idsDataColumn.map((columnId) =>
              <DataGridColumn key={columnId}>
                {valueRenders[columnId](row)}
              </DataGridColumn>)}
          </tr>)}
      </tbody>
    </table>
  );
}
