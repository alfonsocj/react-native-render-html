import React, { useContext, useMemo } from 'react';
import { highlight } from 'lowlight';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  StyleSheet
} from 'react-native';
import StylesheetsProvider, { HighlightJsStyles } from './StylesheetsProvider';
import highlighterStylesheetsContext from './highlighterStylesheetsContext';
// import * as html from 'highlight.js/lib/languages/html';
// registerLanguage('html', html);

export interface HighlighterProps extends ViewProps {
  content: string;
  language: 'html';
  highlightJsStyle: HighlightJsStyles;
  fontSize?: number;
  fontFamily?: string;
  lineNumberFontSize?: number;
  lineNumberFontFamily?: string;
  lineNumberStyle?: StyleProp<TextStyle>;
  lineStyle?: StyleProp<TextStyle>;
  /**
   * When `true`, end overflowing lines with ellipsis.
   */
  clipLines?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  /**
   * A function which returns a string representation of the line number.
   *
   * @example
   * ```js
   * function lineNumberFormatter(lineNumber) {
   *   return Number(lineNumber).toFixed(0).padStart(2, '0');
   * }
   * ```
   */
  lineNumberFormatter?: (lineNumber: number) => string;
  /**
   * A function to compute the desired width of the line number display.
   */
  lineNumberDisplayWidthComputer?: (
    fontSize: number,
    maxLineNumberCharLength: number
  ) => number;
}

const styles = StyleSheet.create({
  line: { flexDirection: 'row' },
  container: { flexGrow: 1, flexDirection: 'column', overflow: 'hidden' }
});

function Element({ element }: { element: lowlight.AST.Element }) {
  const className = element.properties['className'] as string;
  const { contentStylesheet } = useContext(highlighterStylesheetsContext);
  return (
    <Text style={className ? contentStylesheet[className] : null}>
      {element.children?.map((v, i) =>
        React.createElement(Node, { node: v as lowlight.HastNode, key: i })
      )}
    </Text>
  );
}

function Node({ node }: { node: lowlight.HastNode }) {
  if (node.type === 'element') {
    return React.createElement(Element, { element: node });
  }
  if (node.type === 'text') {
    return <Text>{node.value}</Text>;
  }
  return null;
}

function Tree({ nodes }: { nodes: lowlight.HastNode[] }) {
  return (
    <>{nodes?.map((n, i) => React.createElement(Node, { node: n, key: i }))}</>
  );
}

function Line({
  row,
  lineStyle,
  lineNumberStyle,
  lineNumberFormatter,
  index,
  clipLines = false
}: {
  row: lowlight.HastNode[];
  lineStyle: StyleProp<TextStyle>;
  lineNumberStyle: StyleProp<TextStyle>;
  lineNumberFormatter: NonNullable<HighlighterProps['lineNumberFormatter']>;
  index: number;
  clipLines?: boolean;
}) {
  return (
    <View style={styles.line} key={index}>
      <Text style={lineNumberStyle}>{lineNumberFormatter(index + 1)}</Text>
      <Text
        numberOfLines={clipLines ? 1 : undefined}
        lineBreakMode="tail"
        textBreakStrategy="simple"
        style={lineStyle}>
        <Tree nodes={row} />
      </Text>
    </View>
  );
}

function Padding({
  lineNumberStyle,
  value
}: {
  lineNumberStyle: StyleProp<TextStyle>;
  value?: number;
}) {
  if (!value) {
    return null;
  }
  return <Text style={[lineNumberStyle, { height: value }]} />;
}

const defaultLineNumberFormatter = (number: number) =>
  Number(number).toFixed(0);

const defaultLineNumberDisplayWidthComputer = (
  fontSize: number,
  lenght: number
) => {
  return fontSize * lenght;
};

function HighlighterContent({
  content,
  language,
  clipLines,
  fontSize = 14,
  fontFamily,
  lineNumberFontFamily,
  lineNumberFontSize,
  lineNumberStyle: userLineNumberStyle,
  lineStyle: userLineStyle,
  style,
  paddingTop,
  paddingBottom,
  lineNumberFormatter = defaultLineNumberFormatter,
  lineNumberDisplayWidthComputer = defaultLineNumberDisplayWidthComputer,
  ...viewProps
}: Omit<HighlighterProps, 'highlightJsStyle'>) {
  const lines = content.split('\n').map((l) => highlight(language, l).value);
  const { containerStylesheet } = useContext(highlighterStylesheetsContext);
  const syntheticLineNumberFontSize = lineNumberFontSize ?? fontSize;
  const syntheticLineNumberFontFamily = lineNumberFontFamily ?? fontFamily;
  const lineStyle = useMemo(
    () => [
      containerStylesheet.text,
      {
        flexGrow: 1,
        flexShrink: 1,
        fontFamily,
        fontSize,
        lineHeight: fontSize * 1.4
      },
      userLineStyle
    ],
    [containerStylesheet.text, fontFamily, fontSize, userLineStyle]
  );

  const lineNumberWidth = useMemo(() => {
    const numberDisplayLength = lineNumberFormatter(lines.length + 1).length;
    return lineNumberDisplayWidthComputer(fontSize, numberDisplayLength);
  }, [
    fontSize,
    lineNumberDisplayWidthComputer,
    lineNumberFormatter,
    lines.length
  ]);
  const lineNumberStyle: StyleProp<TextStyle> = useMemo(() => {
    return [
      containerStylesheet.text,
      {
        width: lineNumberWidth,
        textAlign: 'center',
        overflow: 'visible',
        fontSize: syntheticLineNumberFontSize,
        fontFamily: syntheticLineNumberFontFamily,
        flexShrink: 0
      },
      userLineNumberStyle
    ];
  }, [
    containerStylesheet.text,
    lineNumberWidth,
    syntheticLineNumberFontFamily,
    syntheticLineNumberFontSize,
    userLineNumberStyle
  ]);
  return (
    <View
      style={[containerStylesheet.container, styles.container, style]}
      {...viewProps}>
      <Padding lineNumberStyle={lineNumberStyle} value={paddingTop} />
      {lines.map((l, i) =>
        React.createElement(Line, {
          key: i,
          row: l,
          index: i,
          lineStyle,
          lineNumberStyle,
          lineNumberFormatter,
          clipLines
        })
      )}
      <Padding lineNumberStyle={lineNumberStyle} value={paddingBottom} />
    </View>
  );
}

export default function Highlighter({
  highlightJsStyle = 'darcula',
  ...props
}: HighlighterProps) {
  return (
    <StylesheetsProvider style={highlightJsStyle}>
      <HighlighterContent {...props} />
    </StylesheetsProvider>
  );
}
