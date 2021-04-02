import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import SnippetScreen from '../SnippetScreen';
import snippets, { devSelectedSnippet, SnippetId } from '../../snippets';
import DrawerSnippetHeader from './DrawerSnippetHeader';
import { useSetSelectedSnippetId } from '../../state/store';
import Lists from '../../playgrounds/Lists';
import CustomDrawerContent from './CustomDrawerContent';
import DrawerPlaygroundHeader from './DrawerPlaygroundHeader';
import useSurfaceBackgroundStyleNucleon from '../../components/nucleons/useSurfaceBackgroundStyleNucleon';

type PlaygroundsRoutes = 'ListsPlayground';

const Drawer = createDrawerNavigator<
  Record<keyof typeof snippets | PlaygroundsRoutes, any>
>();

const initialRouteName = __DEV__ ? devSelectedSnippet : 'whitespace';

const listsPlaygroundsScreenOptions: DrawerNavigationOptions = {
  headerShown: true,
  title: 'Lists Playground',
  header: (props) => <DrawerPlaygroundHeader {...props} />
};

export default function HomeScreen({}: StackScreenProps<any>) {
  const setSelectedSnippetId = useSetSelectedSnippetId();
  React.useEffect(() => {
    setSelectedSnippetId(initialRouteName);
  }, [setSelectedSnippetId]);
  const snippetScreens = (Object.keys(snippets) as SnippetId[]).map(
    (snippetId) => {
      return (
        <Drawer.Screen
          component={SnippetScreen}
          initialParams={{ snippetId }}
          options={{
            header: (props) => (
              <DrawerSnippetHeader snippetId={snippetId} {...props} />
            ),
            title: snippets[snippetId].name
          }}
          key={snippets[snippetId].name}
          name={snippetId}
        />
      );
    }
  );
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      sceneContainerStyle={useSurfaceBackgroundStyleNucleon()}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: true,
        headerTitleAllowFontScaling: true
      }}>
      {snippetScreens}
      <Drawer.Screen
        component={Lists}
        options={listsPlaygroundsScreenOptions}
        key={'lists'}
        name={'ListsPlayground'}
      />
    </Drawer.Navigator>
  );
}
