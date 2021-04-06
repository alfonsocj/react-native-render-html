import { Stack, useSpacing } from '@mobily/stacks';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import HtmlDisplayMolecule from '../components/molecules/HtmlDisplayMolecule';
import SourceDisplayMolecule from '../components/molecules/SourceDisplayMolecule';
import BoxNucleon from '../components/nucleons/BoxNucleon';
import IconNucleon from '../components/nucleons/IconNucleon';
import TextNucleon from '../components/nucleons/TextNucleon';
import { useColorRoles } from '../theme/colorSystem';

export default function RenderHtmlCard({
  html,
  contentWidth,
  caption
}: {
  html: string;
  contentWidth: number;
  caption: string;
}) {
  const hzSpace = useSpacing(0);
  const vtSpace = useSpacing(0);
  const borderWidth = 0;
  const { surface } = useColorRoles();
  const sourceDisplayStyle = {
    backgroundColor: 'rgba(125,125,125,.1)',
    minWidth: contentWidth
  };
  return (
    <BoxNucleon
      style={{
        marginHorizontal: hzSpace,
        paddingVertical: vtSpace
      }}>
      <Stack space={2}>
        <ScrollView indicatorStyle="white" horizontal>
          <SourceDisplayMolecule
            style={sourceDisplayStyle}
            fontSize="normal"
            content={html}
            language="html"
            showLineNumbers={false}
          />
        </ScrollView>
        <BoxNucleon alignX="center">
          <IconNucleon size={30} name="transfer-down" />
        </BoxNucleon>
        <HtmlDisplayMolecule
          style={{
            borderWidth: borderWidth,
            borderColor: surface.secondaryContent
          }}
          renderHtmlProps={{ source: { html } }}
          useLegacy={false}
          supportsLegacy={false}
          contentWidth={contentWidth - (hzSpace + borderWidth) * 2}
        />
        <BoxNucleon paddingX={2}>
          <TextNucleon
            mono
            fontSize="small"
            style={{ flexShrink: 1 }}
            color={surface.secondaryContent}
            italic>
            {caption}
          </TextNucleon>
        </BoxNucleon>
      </Stack>
    </BoxNucleon>
  );
}
