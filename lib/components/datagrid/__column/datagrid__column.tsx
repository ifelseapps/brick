import { classnames } from '@bem-react/classnames';
import { compose, IClassNameProps } from '@bem-react/core';
import React, { ElementType } from 'react';
import { getClassName } from '../utils';
import { withDataGridColumnHeader } from './_header/datagrid__column_header';
import './datagrid__column.scss';


const columnElement = getClassName('column');

export interface IDataGridColumnProps extends IClassNameProps {
  as?: ElementType;
  colSpan?: number;
  rowSpan?: number;
}

const DataGridColumnPresenter: React.FC<IDataGridColumnProps> = ({ as: Component = 'td', className, children, ...props }) => (
  <Component {...props} className={classnames(columnElement, className)}>{children}</Component>
);

export const DataGridColumn = compose(withDataGridColumnHeader)(DataGridColumnPresenter);
