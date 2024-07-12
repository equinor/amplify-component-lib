export interface OptionDrawerSelectItem<T> {
  object: T;
  id: string;
  label: string;
  children: OptionDrawerSelectItem<T>[];
}
