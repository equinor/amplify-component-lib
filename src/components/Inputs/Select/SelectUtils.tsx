export type ValueType = {
  id: string;
  label: string;
  children?: ValueType[];
  value: number;
};

export const items: ValueType[] = [
  {
    id: '1',
    value: 1,
    label: 'One',
    children: [
      {
        id: '11',
        value: 11,
        label: 'OneOne',
      },
      {
        id: '12',
        value: 12,
        label: 'OneTwo',
      },
      {
        id: '13',
        value: 13,
        label: 'OneThree',
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
        label: 'TwoOne',
      },
      {
        id: '22',
        value: 22,
        label: 'TwoTwo',
      },
      {
        id: '23',
        value: 23,
        label: 'TwoThree',
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
        label: 'ThreeOne',
      },
      {
        id: '32',
        value: 32,
        label: 'ThreeTwo',
      },
      {
        id: '33',
        value: 33,
        label: 'ThreeThree',
      },
    ],
  },
  {
    id: '4',
    value: 4,
    label: 'Four',
  },
];
