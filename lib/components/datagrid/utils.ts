import { cn } from '../../classname';
import { ColumnDataRender, ColumnsInitial, HeaderRows, IColumn } from './contracts';

export function createHeaderRows(columns: ColumnsInitial<unknown>): HeaderRows {
  const rows = Object.keys(columns).reduce<HeaderRows>((result, columnId) => {
    const column = columns[columnId];
    if (column.type === 'group' && column.columns) {
      const additionalRows = createHeaderRows(column.columns);
      result[0].push({
        id: columnId,
        title: column.name,
        colspan: Object.keys(column.columns).length,
      });
      return [...result, ...additionalRows];
    }

    result[0].push({
      id: columnId,
      title: column.name,
    });
    return result;
  }, [[]]);

  const rowsCount = rows.length;
  if (rowsCount > 1) {
    rows[0] = rows[0].map((column) => {
      if (column.colspan) {
        return column;
      }
      return { ...column, rowspan: rowsCount };
    });
  }

  return rows;
}

export function getValueRenderFns<TData>(columns: ColumnsInitial<TData>): Record<string, ColumnDataRender<TData>> {
  return Object.keys(columns).reduce((result, columnId) => {
    const column = columns[columnId];
    if (column.type === 'group' && column.columns) {
      return { ...result, ...getValueRenderFns(column.columns) };
    }

    return {
      ...result,
      [columnId]: (column as IColumn<TData>).renderValue,
    };
  }, {});
}

export const getClassName = cn('datagrid');
