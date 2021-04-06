import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import ThemeProvider from './src/theme/ThemeProvider';
import ColorSchemeProvider from './src/state/ColorSchemeProvider';
import { useColorScheme, useWindowDimensions } from 'react-native';
import LinkPressDisplayMolecule from './src/components/molecules/LinkPressDisplayMolecule';
import { StacksProvider } from '@mobily/stacks';
import contentWidthContextNucleon from './src/components/nucleons/contentWidthContextNucleon';
import Images from './src/features/Images';

enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const initialColorScheme = useColorScheme() || 'light';
  const contentWidth = useWindowDimensions().width;
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <contentWidthContextNucleon.Provider value={contentWidth}>
        <StacksProvider spacing={5}>
          <SafeAreaProvider>
            <ColorSchemeProvider initialColorScheme={initialColorScheme}>
              <ThemeProvider>
                <LinkPressDisplayMolecule>
                  {/* <Navigation /> */}
                  <SafeAreaView style={{ flex: 1 }}>
                    <Images />
                  </SafeAreaView>
                  <StatusBar style="light" />
                </LinkPressDisplayMolecule>
              </ThemeProvider>
            </ColorSchemeProvider>
          </SafeAreaProvider>
        </StacksProvider>
      </contentWidthContextNucleon.Provider>
    );
  }
}
