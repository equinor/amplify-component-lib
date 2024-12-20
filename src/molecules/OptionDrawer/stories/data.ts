export interface ValueType {
  id: string;
  label: string;
  disabled?: boolean;
  children?: ValueType[];
  value: number;
}

export const items: ValueType[] = [
  {
    id: '1',
    value: 1,
    label: 'One',
    children: [
      {
        id: '11',
        value: 11,
        label: 'First',
        disabled: true,
        children: [
          {
            id: '111',
            value: 111,
            label: 'Uno',
            disabled: true,
          },
          {
            id: '112',
            value: 112,
            label: 'Dos',
            children: [
              {
                id: '1121',
                value: 1121,
                label: 'En',
                disabled: true,
              },
              {
                id: '1122',
                value: 1122,
                label: 'To',
              },
            ],
          },
        ],
      },
      {
        id: '12',
        value: 12,
        label: 'Second',
      },
      {
        id: '13',
        value: 13,
        label: 'Third',
      },
    ],
  },
  {
    id: '2',
    value: 2,
    label: 'Two',
    children: [
      {
        id: '21',
        value: 21,
        label: 'Pablo',
      },
      {
        id: '22',
        value: 22,
        label: 'Diago',
      },
      {
        id: '23',
        value: 23,
        label: 'Primo',
      },
    ],
  },
  {
    id: '3',
    value: 3,
    label: 'Three',
    children: [
      {
        id: '31',
        value: 31,
        label: 'Alpha',
      },
      {
        id: '32',
        value: 32,
        label: 'Beta',
      },
      {
        id: '33',
        value: 33,
        label: 'Charlie',
      },
    ],
  },
  {
    id: '4',
    value: 4,
    label: 'Four',
  },
];
