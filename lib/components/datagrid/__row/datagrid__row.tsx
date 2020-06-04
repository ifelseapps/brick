import React from 'react';
import { classnames } from '@bem-react/classnames';
import { compose, IClassNameProps } from '@bem-react/core';
import { getClassName } from '../utils';
import { withDataGridRowActive } from './_active/datagrid__row_active';


const rowElement = getClassName('row');

export interface IDataGridRowBaseProps extends IClassNameProps {
  id: string;
}

const DataGridRowBase: React.FC<IDataGridRowBaseProps> = ({ className, children, id }) => {
  return (
    <tr className={classnames(rowElement, className)} data-id={id}>
      {children}
    </tr>
  );
};

export const DataGridRow = compose(withDataGridRowActive)(DataGridRowBase);
