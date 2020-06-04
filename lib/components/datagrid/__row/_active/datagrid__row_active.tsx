import { withBemMod } from '@bem-react/core';
import { getClassName } from '../../utils';
import { IDataGridRowBaseProps } from '../datagrid__row';
import './datagrid__row_active.scss';

export interface IDataGridRowActiveProps {
  active?: boolean;
}

export const withDataGridRowActive = withBemMod<IDataGridRowActiveProps, IDataGridRowBaseProps>(
  getClassName('row'),
  { active: true },
);
