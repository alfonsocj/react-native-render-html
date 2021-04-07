import { Stack, StackProps } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import TextNucleonRole, {
  TextRoleNucleonProps
} from '../components/nucleons/TextRoleNucleon';
import * as ReactNative from 'react-native';
import BoxNucleon from '../components/nucleons/BoxNucleon';
import { useNuclearContentWidth } from '../components/nucleons/useContentWidthContext';
import SurfaceAtom from '../components/atoms/SurfaceAtom';
import RenderHtmlCard from './RenderHtmlCard';
import { ScrollView } from 'react-native-gesture-handler';
import { WithStyleProp } from '../components/nucleons/types';
import { useColorPrimitives, useColorRoles } from '../theme/colorSystem';
import IconNucleon from '../components/nucleons/IconNucleon';
import textColorContext from '../state/textColorContext';
import DividerAtom from '../components/atoms/DividerAtom';
import useOnLinkPress from '../hooks/useOnLinkPress';
import TextRoleNucleon from '../components/nucleons/TextRoleNucleon';

type TextProps = Omit<TextRoleNucleonProps, 'role'>;

function BodyHyperlinkAtom(props: TextProps) {
  const { hyperlinkColor } = useColorRoles();
  return <TextNucleonRole {...props} color={hyperlinkColor} role="hyperlink" />;
}

function BodyHtmlAttributeRef(props: TextProps) {
  return <BodyHyperlinkAtom {...props} />;
}

// TODO refactor onLinkPress
function BodyHtmlElementRef({
  children,
  ...props
}: Omit<TextProps, 'children'> & { children: string }) {
  const onLinkPress = useOnLinkPress();
  return (
    <BodyHyperlinkAtom
      {...props}
      onPress={(e) =>
        onLinkPress(
          e,
          `https://developer.mozilla.org/docs/Web/HTML/Element/${children}`,
          {},
          '_blank'
        )
      }>
      &lt;{children}&gt;
    </BodyHyperlinkAtom>
  );
}

function BodyJavaScriptSymbolAtom({ name }: { name: string }) {
  return <BodyHyperlinkAtom>{name}</BodyHyperlinkAtom>;
}

function BodyRenderHtmlPropRef({ name }: { name: keyof RenderHTMLProps }) {
  return <BodyHyperlinkAtom>{name}</BodyHyperlinkAtom>;
}

function BodyReactNativeExportRef({
  name
}: {
  name: keyof typeof ReactNative;
}) {
  return <BodyHyperlinkAtom>{name}</BodyHyperlinkAtom>;
}

function BodyParagraphAtom(props: TextProps) {
  return (
    <BoxNucleon paddingX={2}>
      <TextNucleonRole role="body" {...props} />
    </BoxNucleon>
  );
}

function BodyTipBox({ children, ...props }: TextProps) {
  const { surface, tipColor } = useColorRoles();
  const dividerHeight = ReactNative.StyleSheet.hairlineWidth;
  const renderDivider = () => (
    <BoxNucleon paddingX={2}>
      <DividerAtom height={dividerHeight} color={tipColor} />
    </BoxNucleon>
  );
  return (
    <BoxNucleon {...props} style={[props.style]}>
      <Stack space={1}>
        {renderDivider()}
        <BoxNucleon
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <BoxNucleon
            style={{
              flexGrow: 1,
              flexShrink: 1,
              alignSelf: 'stretch',
              justifyContent: 'center'
            }}>
            <textColorContext.Provider value={surface.secondaryContent}>
              {children}
            </textColorContext.Provider>
          </BoxNucleon>
          <BoxNucleon padding={2} backgroundColor={surface.background}>
            <IconNucleon
              color={tipColor}
              name="lightbulb-on-outline"
              size={16}
            />
          </BoxNucleon>
        </BoxNucleon>
        {renderDivider()}
      </Stack>
    </BoxNucleon>
  );
}

function BodyHeaderMolecule({
  children,
  style
}: WithStyleProp<PropsWithChildren<{}>>) {
  const { surface } = useColorRoles();
  const color = surface.secondaryContent;
  return (
    <Stack space={1}>
      <DividerAtom
        height={ReactNative.StyleSheet.hairlineWidth}
        color={color}
      />
      <BoxNucleon paddingX={2}>
        <TextNucleonRole color={color} role="bodyHeader1" style={style}>
          {children}
        </TextNucleonRole>
      </BoxNucleon>
      <DividerAtom
        height={ReactNative.StyleSheet.hairlineWidth}
        color={color}
      />
    </Stack>
  );
}

const inlineExample = `<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>`;

const autoSizeExample = `<img
  width="1200" height="800"
  src="https://i.imgur.com/XP2BE7q.jpg"
/>`;

const unreachableExample = `<img
  width="200" height="100"
  alt="The Void"
  src="http://example.tld/image.jpg"
/>`;

function BodyHead({
  style,
  imageSource,
  children
}: WithStyleProp<StackProps & { imageSource: number }>) {
  const width = useNuclearContentWidth();
  return (
    <Stack space={4} style={style}>
      <ReactNative.Image
        style={{ width, height: (9 / 16) * width }}
        source={imageSource}
      />
      {children}
    </Stack>
  );
}

function BodyChapter({
  title,
  style,
  children
}: PropsWithChildren<WithStyleProp<{ title: string }>>) {
  return (
    <Stack style={style} space={4}>
      <BodyHeaderMolecule>{title}</BodyHeaderMolecule>
      {children}
    </Stack>
  );
}

function AttributesSupportTable({
  style,
  attributes
}: WithStyleProp<{ attributes: Record<string, boolean> }>) {
  return (
    <ReactNative.View
      style={[
        { backgroundColor: 'rgba(125,125,125,0.1)', padding: 10 },
        style
      ]}>
      <Stack space={2}>
        <TextRoleNucleon role="bodyTableHeader">Attributes</TextRoleNucleon>
        {Object.entries(attributes).map(([attr, support]) => {
          return (
            <Stack horizontal space={4} key={attr}>
              <ReactNative.View
                style={{ width: 150, justifyContent: 'center', flexGrow: 1 }}>
                <TextNucleonRole role="hyperlink">{attr}</TextNucleonRole>
              </ReactNative.View>
              <ReactNative.View
                style={{ width: 100, justifyContent: 'center', flexGrow: 1 }}>
                <IconNucleon name={support ? 'check-bold' : 'close'} />
              </ReactNative.View>
            </Stack>
          );
        })}
      </Stack>
    </ReactNative.View>
  );
}

export default function Images() {
  const contentWidth = useNuclearContentWidth();
  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <SurfaceAtom paddingBottom={2}>
        <Stack space={10}>
          <BodyHead
            imageSource={require('../../assets/images/soragrit-wongsa-pictures.jpg')}>
            <BodyParagraphAtom>
              This article covers the{' '}
              <BodyHtmlElementRef>img</BodyHtmlElementRef> element renderer.{' '}
              <BodyHtmlElementRef>picture</BodyHtmlElementRef> is not yet
              supported.
            </BodyParagraphAtom>
            <AttributesSupportTable
              attributes={{
                alt: true,
                src: true,
                width: true,
                height: true,
                crossorigin: false,
                anonymous: false,
                'use-credentials': false,
                decoding: false,
                ismap: false,
                loading: false,
                referrerpolicy: false,
                sizes: false,
                srcset: false,
                usemap: false
              }}
            />
          </BodyHead>
          <BodyChapter title={'Sizing'}>
            <BodyParagraphAtom>
              To determine the display size of an image, the renderer will go
              through the following steps:{'\n'}
              1. 2. 3.
            </BodyParagraphAtom>
          </BodyChapter>
          <BodyChapter title={'Scaling'}>
            <BodyParagraphAtom>
              The renderer will automatically scale images down to the available
              width, even when the provided inline style width is greater than
              the container width.
            </BodyParagraphAtom>
            <BodyTipBox>
              <BodyParagraphAtom>
                You are strongly advised to provide a{' '}
                <BodyRenderHtmlPropRef name="contentWidth" /> property from{' '}
                <BodyReactNativeExportRef name="useWindowDimensions" /> official
                hook to help this component handle the scaling.
              </BodyParagraphAtom>
            </BodyTipBox>
            <RenderHtmlCard
              caption={
                'This image dimensions are set with inline styles. Note that both the width/height couple and the style attributes are evaluated, but the style attribute takes precedence. The relative width (50%) is computed against contentWidth.'
              }
              html={inlineExample}
              contentWidth={contentWidth}
            />
            <BodyParagraphAtom>
              The next image will be sized automatically thanks to the{' '}
              <BodyRenderHtmlPropRef name="contentWidth" /> and{' '}
              <BodyRenderHtmlPropRef name="computeEmbeddedMaxWidth" /> props.
              The latter allows you to set the maximum width from{' '}
              <BodyRenderHtmlPropRef name="contentWidth" />, or disabling
              scaling by returning <BodyJavaScriptSymbolAtom name="Infinity" />.
            </BodyParagraphAtom>
            <RenderHtmlCard
              caption={
                "This image has no inline style. Its width and height are determined by the width and height attributes, scaled down to fit the result of computeEmbeddedMaxWidth('img')."
              }
              html={autoSizeExample}
              contentWidth={contentWidth}
            />
          </BodyChapter>
          <BodyChapter title="Preloading">
            <BodyParagraphAtom>
              Similarly to browsers, this library will place a print box before
              fetching image dimensions when both{' '}
              <BodyHtmlAttributeRef>width</BodyHtmlAttributeRef> and{' '}
              <BodyHtmlAttributeRef>height</BodyHtmlAttributeRef> attributes are
              provided, or the two dimensions are set in the{' '}
              <BodyHtmlAttributeRef>style</BodyHtmlAttributeRef> attribute. This
              is great to avoid images "jumping" from zero height to their
              computed height, and is a hint to good web design.
            </BodyParagraphAtom>
          </BodyChapter>
          <BodyChapter title="Error Handling">
            <RenderHtmlCard
              caption={
                'When an image is unreachable, the image renderer will print a box while preserving its requested dimensions. It will also display at the center of the box the content of alt attribute.'
              }
              html={unreachableExample}
              contentWidth={contentWidth}
            />
          </BodyChapter>
        </Stack>
      </SurfaceAtom>
    </ScrollView>
  );
}
