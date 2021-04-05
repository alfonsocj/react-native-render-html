import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TNode, tnodeToString } from 'react-native-render-html';
import TextNucleon from '../nucleons/TextNucleon';

export default function TTreeDisplayMolecule({
  ttree,
  style
}: {
  ttree?: TNode;
  style?: StyleProp<ViewStyle>;
}) {
  const lines = ((ttree && tnodeToString(ttree)) || '').split('\n');
  return (
    <View style={style}>
      {lines.map((t, i) => (
        <TextNucleon mono fontSize="small" key={i} numberOfLines={1}>
          {t}
        </TextNucleon>
      ))}
    </View>
  );
}
