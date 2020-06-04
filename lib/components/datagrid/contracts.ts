import { ReactNode } from 'react';


export interface IDataRowBase {
  id: string;
}
export type ColumnsInitial<TData extends IDataRowBase> = Record<string, Column<TData>>;
type Column<TData extends IDataRowBase> = IColumnGroup<TData> | IColumn<TData>;
export interface IColumnGroup<TData extends IDataRowBase> {
  type: 'group';
  name: string;
  columns?: ColumnsInitial<TData>;
}
export interface IColumn<TData extends IDataRowBase> {
  type: 'column';
  name: string;
  renderValue: ColumnDataRender<TData>;
}
export type ColumnDataRender<TData extends IDataRowBase> = (row: TData) => ReactNode;

export type HeaderRows = Array<Array<{
  id: string;
  title: string;
  colspan?: number;
  rowspan?: number;
}>>;
