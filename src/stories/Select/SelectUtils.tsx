import { SelectItem } from '../../components/Select';

export type ValueType = { value: number };

export const items: SelectItem<ValueType>[] = [
  {
    id: '1',
    object: { value: 1 },
    label: 'One',
    children: [
      {
        id: '11',
        object: { value: 11 },
        label: 'OneOne',
        children: [],
      },
      {
        id: '12',
        object: { value: 12 },
        label: 'OneTwo',
        children: [],
      },
      {
        id: '13',
        object: { value: 13 },
        label: 'OneThree',
        children: [],
      },
    ],
  },
  {
    id: '2',
    object: { value: 2 },
    label: 'Two',
    children: [
      {
        id: '21',
        object: { value: 21 },
        label: 'TwoOne',
        children: [],
      },
      {
        id: '22',
        object: { value: 22 },
        label: 'TwoTwo',
        children: [],
      },
      {
        id: '23',
        object: { value: 23 },
        label: 'TwoThree',
        children: [],
      },
    ],
  },
  {
    id: '3',
    object: { value: 3 },
    label: 'Three',
    children: [
      {
        id: '31',
        object: { value: 31 },
        label: 'ThreeOne',
        children: [],
      },
      {
        id: '32',
        object: { value: 32 },
        label: 'ThreeTwo',
        children: [],
      },
      {
        id: '33',
        object: { value: 33 },
        label: 'ThreeThree',
        children: [],
      },
    ],
  },
];
