import { StyleProp, ViewStyle } from 'react-native';

export interface SelectorProps<V extends string | number> {
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
}

export type SelectorItem<V extends string | number> = {
  value: V;
  label?: string;
};

export interface SelectorListProps<V extends string | number>
  extends SelectorProps<V> {
  items: ReadonlyArray<SelectorItem<V>> | ReadonlyArray<V>;
}

export interface WithStyleProp {
  style?: StyleProp<ViewStyle>;
}
