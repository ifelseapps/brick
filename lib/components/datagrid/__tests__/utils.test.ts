import { ColumnsInitial, HeaderRows } from '../contracts';
import { createHeaderRows, getValueRenderFns } from '../utils';

describe('Datagrid utils', () => {
  const columns: ColumnsInitial<unknown> = {
    id: {
      type: 'column',
      name: 'Номер операции',
      renderValue: () => null,
    },
    date: {
      type: 'column',
      name: 'Дата операции',
      renderValue: () => null,
    },
    accounts: {
      type: 'group',
      name: 'Корреспондирующие счета',
      columns: {
        debit: {
          type: 'column',
          name: 'Дебит',
          renderValue: () => null,
        },
        credit: {
          type: 'column',
          name: 'Кредит',
          renderValue: () => null,
        },
      } as const,
    },
    amount: {
      type: 'column',
      name: 'Сумма',
      renderValue: () => null,
    },
  } as const;

  test('Create header rows from column descriptions', () => {
    const result: HeaderRows = [
      [
        {
          id: 'id',
          title: 'Номер операции',
          rowspan: 2,
        },
        {
          id: 'date',
          title: 'Дата операции',
          rowspan: 2,
        },
        {
          id: 'accounts',
          title: 'Корреспондирующие счета',
          colspan: 2,
        },
        {
          id: 'amount',
          title: 'Сумма',
          rowspan: 2,
        },
      ],
      [
        {
          id: 'debit',
          title: 'Дебит',
        },
        {
          id: 'credit',
          title: 'Кредит',
        },
      ],
    ];

    expect(createHeaderRows(columns)).toEqual(result);
  });

  test('Get data column ids', () => {
    const result = {
      id: (columns.id as any).renderValue,
      date: (columns.date as any).renderValue,
      debit: (columns.accounts as any).columns.debit.renderValue,
      credit: (columns.accounts as any).columns.credit.renderValue,
      amount: (columns.amount as any).renderValue,
    };
    expect(getValueRenderFns(columns)).toEqual(result);
  });
});
