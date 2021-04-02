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
  readonly items: ReadonlyArray<SelectorItem<V>> | ReadonlyArray<V>;
}

export type WithStyleProp<P> = {
  style?: StyleProp<ViewStyle>;
} & P;
