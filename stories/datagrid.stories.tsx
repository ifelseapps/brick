import React from 'react';
import { ColumnsInitial, DataGrid } from '../lib/components/datagrid';

export default {
  title: 'DataGrid',
};

interface IRowData {
  id: string;
  date: string;
  debit: string;
  credit: string;
  amount: string;
}

const columns: ColumnsInitial<IRowData> = {
  id: {
    type: 'column',
    name: 'Номер операции',
    renderValue: (row) => row.id,
  },
  date: {
    type: 'column',
    name: 'Дата операции',
    renderValue: (row) => row.date,
  },
  accounts: {
    type: 'group',
    name: 'Корреспондирующие счета',
    columns: {
      debit: {
        type: 'column',
        name: 'Дебит',
        renderValue: (row) => row.debit,
      },
      credit: {
        type: 'column',
        name: 'Кредит',
        renderValue: (row) => row.credit,
      },
    },
  },
  amount: {
    type: 'column',
    name: 'Сумма',
    renderValue: (row) => row.amount,
  },
};

const rows: IRowData[] = [
  {
    id: '0000000001',
    date: '05.05.2020',
    debit: '71',
    credit: '50',
    amount: '50 000,00',
  },
  {
    id: '0000000002',
    date: '05.05.2020',
    debit: '71',
    credit: '50',
    amount: '50 000,00',
  },
];

export const testExample = () =>
  <div style={{ width: 900 }}>
    <DataGrid columns={columns} data={rows} />
  </div>;
