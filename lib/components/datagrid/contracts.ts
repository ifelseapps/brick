import { ReactNode } from 'react';

export type ColumnsInitial<TData> = Record<string, Column<TData>>;
type Column<TData> = IColumnGroup<TData> | IColumn<TData>;
export interface IColumnGroup<TData> {
  type: 'group';
  name: string;
  columns?: ColumnsInitial<TData>;
}
export interface IColumn<TData> {
  type: 'column';
  name: string;
  renderValue: ColumnDataRender<TData>;
}
export type ColumnDataRender<TData> = (row: TData) => ReactNode;

export type HeaderRows = Array<Array<{
  id: string;
  title: string;
  colspan?: number;
  rowspan?: number;
}>>;
