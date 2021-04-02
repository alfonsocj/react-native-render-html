import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import RadioGroupControlMolecule from '../../molecules/RadioGroupControlMolecule';
import SourceDisplayMolecule from '../../molecules/SourceDisplayMolecule';
import TTreeDisplayMolecule from '../../molecules/TTreeDisplayMolecule';
import BoxNucleon from '../../nucleons/BoxNucleon';
import TextNucleon from '../../nucleons/TextNucleon';
import { demoStateContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';
import {
  usePlaygroundSetter,
  usePlaygroundStateSlice
} from './playgroundStore';
import { useColorPrimitives } from '../../../state/colorSystem';
import { WithStyleProp } from '../../nucleons/types';

function SourceSectionTitle({
  title,
  style
}: WithStyleProp<{ title: string }>) {
  const { primary } = useColorPrimitives();
  return (
    <BoxNucleon padding={1} backgroundColor={primary.color} style={style}>
      <TextNucleon align="center" color={primary.content} bold>
        {title}
      </TextNucleon>
    </BoxNucleon>
  );
}

function SourceRouteSection({
  children,
  title,
  style
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  title: string;
}>) {
  return (
    <BoxNucleon style={style}>
      <Stack space={0}>
        <SourceSectionTitle title={title} />
        <BoxNucleon>{children}</BoxNucleon>
      </Stack>
    </BoxNucleon>
  );
}

function SourceBoxAtom({
  children,
  padding,
  style
}: PropsWithChildren<{ style?: StyleProp<ViewStyle>; padding?: number }>) {
  const { surface: background } = useColorPrimitives();
  return (
    <BoxNucleon
      padding={padding}
      style={style}
      backgroundColor={background.content}
      color={background.color}>
      {children}
    </BoxNucleon>
  );
}

function HtmlDisplayBox({ html, style }: { html: string; style?: any }) {
  return (
    <SourceBoxAtom style={style}>
      <SourceDisplayMolecule
        clipLines
        fontSize="small"
        content={html}
        paddingVertical={2}
        language="html"
      />
    </SourceBoxAtom>
  );
}

export default function SheetSourceRoute() {
  const ttree = useContext(demoStateContext).ttree;
  const html = useContext(demoStateContext).html;
  const sourceMap = usePlaygroundStateSlice('sourceMap');
  const selectedSource = usePlaygroundStateSlice('selectedSource');
  const setSelectedSource = usePlaygroundSetter('selectedSource');
  const items = useMemo(
    () =>
      Object.keys(sourceMap).map((key) => ({
        label: sourceMap[key].label,
        value: key
      })),
    [sourceMap]
  );
  return (
    <SheetRouteContainer>
      <BoxNucleon>
        <Stack space={4}>
          <SourceRouteSection title="Select source">
            <RadioGroupControlMolecule
              selectedValue={selectedSource}
              onSelectedValueChange={setSelectedSource}
              items={items}
            />
          </SourceRouteSection>
          <SourceRouteSection title="HTML source">
            <HtmlDisplayBox html={html} />
          </SourceRouteSection>
          <SourceRouteSection title="Transient Render Tree">
            <SourceBoxAtom padding={2}>
              <TTreeDisplayMolecule ttree={ttree} />
            </SourceBoxAtom>
          </SourceRouteSection>
        </Stack>
      </BoxNucleon>
    </SheetRouteContainer>
  );
}
