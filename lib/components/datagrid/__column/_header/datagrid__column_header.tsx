import { withBemMod } from '@bem-react/core';
import React from 'react';
import { getClassName } from '../../utils';
import { IDataGridColumnProps } from '../datagrid__column';
import './datagrid__column_header.scss';


export interface IDatagridColumnHeaderProps {
  header?: boolean;
}

export const withDataGridColumnHeader = withBemMod<IDatagridColumnHeaderProps, IDataGridColumnProps>(
  getClassName('column'),
  { header: true },
  (Column) => (props) => (<Column {...props} as="th" />),
);
