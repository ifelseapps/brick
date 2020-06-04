import React from 'react';
import { classnames } from '@bem-react/classnames';
import { IClassNameProps } from '@bem-react/core';
import { useHotKeys } from '../../hooks/useHotKeys';
import { DataGridRow } from './__row/datagrid__row';
import { ColumnsInitial, IDataRowBase } from './contracts';
import { createHeaderRows, getClassName, getValueRenderFns } from './utils';
import { DataGridColumn } from './__column/datagrid__column';
import './datagrid.scss';


const dataGridBlock = getClassName();

export interface IDataGridProps<TData extends IDataRowBase> extends IClassNameProps {
  columns: ColumnsInitial<TData>;
  data: TData[];
}

export function DataGrid<TData extends IDataRowBase>({ columns, data, className }: IDataGridProps<TData>) {
  const headerRows = createHeaderRows(columns);
  const valueRenders = getValueRenderFns(columns);
  const idsDataColumn = Object.keys(valueRenders);
  const [activeRow, setActiveRow] = React.useState(0);
  const [isFocused, setFocused] = React.useState(false);
  const focusHandler = React.useCallback(() => setFocused(!isFocused), [isFocused]);
  const hotKeys = useHotKeys(isFocused);

  const clickHandler = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    const row = (e.target as HTMLElement).closest('tr');
    if (row && row.dataset.id) {
      const n = data.findIndex((dataRow) => dataRow.id === row.dataset.id);
      if (n != null) {
        setActiveRow(n);
      }
    }
  }, [data]);

  React.useEffect(() => {
    hotKeys.bind(['ArrowDown'], () => setActiveRow((prevActiveRow) => prevActiveRow + 1 <= data.length - 1 ? prevActiveRow + 1 : prevActiveRow));
    hotKeys.bind(['ArrowUp'], () => setActiveRow((prevActiveRow) => prevActiveRow - 1 >= 0 ? prevActiveRow - 1 : prevActiveRow));
    hotKeys.bind(['Home'], () => setActiveRow(0));
    hotKeys.bind(['End'], () => setActiveRow(data.length - 1));
  }, []);

  return (
    <table
      className={classnames(dataGridBlock, className)}
      tabIndex={0}
      onClick={clickHandler}
      onFocus={focusHandler}
      onBlur={focusHandler}
    >
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
          <DataGridRow key={row.id} id={row.id} active={index === activeRow}>
            {idsDataColumn.map((columnId) =>
              <DataGridColumn key={columnId}>
                {valueRenders[columnId](row)}
              </DataGridColumn>)}
          </DataGridRow>)}
      </tbody>
    </table>
  );
}
