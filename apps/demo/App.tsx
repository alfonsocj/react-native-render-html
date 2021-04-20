import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import ThemeProvider from './src/theme/ThemeProvider';
import ColorSchemeProvider from './src/state/ColorSchemeProvider';
import { useColorScheme, useWindowDimensions } from 'react-native';
import UILinkPressDisplayMolecule from './src/components/UILinkPressDisplayMolecule';
import { StacksProvider } from '@mobily/stacks';
import { ToolkitProvider, UIToolkitConfig } from 'doc-pages';
import contentWidthContextNucleon from './src/components/nucleons/contentWidthContextNucleon';
import BodyChapterMolecule from './src/components/BodyChapterMolecule';
import BodyListAtom from './src/components/BodyListAtom';
import BodyListItemAtom from './src/components/BodyListItemAtom';
import BodyParagraphAtom from './src/components/BodyParagraphAtom';
import RenderHtmlCardOrganism from './src/components/RenderHtmlCardOrganism';
import UISourceDisplayMolecule from './src/components/UISourceDisplayMolecule';
import { ScrollView } from 'react-native-gesture-handler';
import BodyTipBoxAtom from './src/components/BodyTipBoxAtom';
import UIHyperlinkAtom from './src/components/UIHyperlinkAtom';
import useOnLinkPress from './src/hooks/useOnLinkPress';
import ArticleContainerAtom from './src/components/ArticleContainerAtom';
import ArticleHeaderAtom from './src/components/ArticleHeader';

enableScreens();

const RefBuilder: UIToolkitConfig['RefBuilder'] = ({ name, url }) => {
  const onLinkPress = useOnLinkPress(url);
  return <UIHyperlinkAtom onPress={onLinkPress}>{name}</UIHyperlinkAtom>;
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const initialColorScheme = useColorScheme() || 'light';
  const contentWidth = useWindowDimensions().width;
  const toolkitConfig: UIToolkitConfig = {
    Container: ArticleContainerAtom,
    Chapter: BodyChapterMolecule,
    Header: ArticleHeaderAtom as any,
    List: BodyListAtom,
    ListItem: BodyListItemAtom,
    Paragraph: BodyParagraphAtom,
    RenderHtmlCard: RenderHtmlCardOrganism,
    SourceDisplay: ({ content, lang }) => (
      <ScrollView horizontal style={{ flexGrow: 0 }}>
        <UISourceDisplayMolecule content={content} language={lang as any} />
      </ScrollView>
    ),
    TipBox: BodyTipBoxAtom,
    RefBuilder
  };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <contentWidthContextNucleon.Provider value={contentWidth}>
        <ToolkitProvider config={toolkitConfig}>
          <StacksProvider spacing={5}>
            <SafeAreaProvider>
              <ColorSchemeProvider initialColorScheme={initialColorScheme}>
                <ThemeProvider>
                  <UILinkPressDisplayMolecule>
                    <Navigation />
                    <StatusBar style="light" />
                  </UILinkPressDisplayMolecule>
                </ThemeProvider>
              </ColorSchemeProvider>
            </SafeAreaProvider>
          </StacksProvider>
        </ToolkitProvider>
      </contentWidthContextNucleon.Provider>
    );
  }
}
