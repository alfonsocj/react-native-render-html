import { Stack } from '@mobily/stacks';
import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from '../nucleons/TextRoleNucleon';
import * as ReactNative from 'react-native';
import BoxNucleon from '../nucleons/BoxNucleon';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import RenderHtmlCard from './RenderHtmlCard';
import { ScrollView } from 'react-native-gesture-handler';
import { PropsWithStyle } from '../nucleons/types';
import { useColorRoles } from '../../theme/colorSystem';
import IconNucleon from '../nucleons/IconNucleon';
import useOnLinkPress from '../../hooks/useOnLinkPress';
import useSurfaceBackgroundStyleNucleon from '../nucleons/useSurfaceBackgroundStyleNucleon';
import BodyParagraphAtom from '../BodyParagraphAtom';
import BodyTipBoxAtom from '../BodyTipBoxAtom';
import BodyChapterMolecule from '../BodyChapterMolecule';
import ArticleHeaderAtom from '../ArticleHeader';

type TextProps = Omit<TextRoleNucleonProps, 'role'>;

function BodyHyperlinkAtom(props: TextProps) {
  const { hyperlinkColor } = useColorRoles();
  return <TextRoleNucleon {...props} color={hyperlinkColor} role="hyperlink" />;
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

function AttributesSupportTable({
  style,
  attributes
}: PropsWithStyle<{ attributes: Record<string, boolean> }>) {
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
                <TextRoleNucleon role="hyperlink">{attr}</TextRoleNucleon>
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
    <ScrollView
      style={{ flexGrow: 1 }}
      contentContainerStyle={useSurfaceBackgroundStyleNucleon()}>
      <BoxNucleon paddingBottom={2}>
        <Stack space={10}>
          <ArticleHeaderAtom
            imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
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
          </ArticleHeaderAtom>
          <BodyChapterMolecule title={'Sizing'}>
            <BodyParagraphAtom>
              To determine the display size of an image, the renderer will go
              through the following steps:{'\n'}
              1. 2. 3.
            </BodyParagraphAtom>
          </BodyChapterMolecule>
          <BodyChapterMolecule title={'Scaling'}>
            <BodyParagraphAtom>
              The renderer will automatically scale images down to the available
              width, even when the provided inline style width is greater than
              the container width.
            </BodyParagraphAtom>
            <BodyTipBoxAtom>
              You are strongly advised to provide a{' '}
              <BodyRenderHtmlPropRef name="contentWidth" /> property from{' '}
              <BodyReactNativeExportRef name="useWindowDimensions" /> official
              hook to help this component handle the scaling.
            </BodyTipBoxAtom>
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
          </BodyChapterMolecule>
          <BodyChapterMolecule title="Preloading">
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
          </BodyChapterMolecule>
          <BodyChapterMolecule title="Error Handling">
            <RenderHtmlCard
              caption={
                'When an image is unreachable, the image renderer will print a box while preserving its requested dimensions. It will also display at the center of the box the content of alt attribute.'
              }
              html={unreachableExample}
              contentWidth={contentWidth}
            />
          </BodyChapterMolecule>
        </Stack>
      </BoxNucleon>
    </ScrollView>
  );
}
