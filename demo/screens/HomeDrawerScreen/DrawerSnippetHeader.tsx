import * as React from 'react';
import { Divider } from 'react-native-paper';
import {
  useToggleLegacyMode,
  useLegacyMode,
  useSelectedHTML
} from '../../state/store';
import filteredSnippets, { SnippetId } from '../../snippets';
import { Linking, Platform } from 'react-native';
import AppbarActionAtom from '../../components/atoms/AppbarActionAtom';
import MenuAtom from '../../components/atoms/MenuAtom';
import MenuItemAtom from '../../components/atoms/MenuItemAtom';
import AppbarContentAtom from '../../components/atoms/AppbarContentAtom';
import HeaderMolecule from '../../components/molecules/HeaderMolecule';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import CardColorRolesProvider from '../../state/CardColorRolesProvider';
import { useColorRoles } from '../../state/colorSystem';

export type DrawerSnippetHeaderProps = DrawerHeaderProps & {
  snippetId: SnippetId;
};

function MenuContent({
  navigation,
  anchor,
  snippetId,
  menuVisible,
  setMenuVisible
}: {
  navigation: any;
  anchor: JSX.Element;
  snippetId: DrawerSnippetHeaderProps['snippetId'];
  menuVisible: boolean;
  setMenuVisible: (state: boolean) => void;
}) {
  const toggleUseLegacy = useToggleLegacyMode();
  const legacyMode = useLegacyMode();
  const html = useSelectedHTML();
  const snippetSource = filteredSnippets[snippetId].codeSource;
  const sourceURL = `https://github.com/meliorence/react-native-render-html/tree/dev/foundry${snippetSource}#L1`;
  const makeOnPress = (fn?: () => void) => {
    return () => {
      setMenuVisible(false);
      fn?.call(null);
    };
  };
  return (
    <MenuAtom
      visible={menuVisible}
      statusBarHeight={100}
      onDismiss={makeOnPress()}
      anchor={anchor}>
      <MenuItemAtom
        iconName="xml"
        // FIXME
        //@ts-ignore
        disabled={!html}
        onPress={makeOnPress(() => navigation.navigate('source'))}
        title="Show HTML"
      />
      <MenuItemAtom
        iconName="file-tree"
        onPress={makeOnPress(() => navigation.navigate('ttree'))}
        title="Show tree"
      />
      <MenuItemAtom
        iconName="open-in-new"
        onPress={makeOnPress(() => Linking.openURL(sourceURL))}
        title="Open code"
      />
      <Divider />
      <MenuItemAtom
        iconName={legacyMode ? 'alpha-f-circle' : 'alpha-l-circle'}
        onPress={makeOnPress(toggleUseLegacy)}
        title={`Enable ${legacyMode ? 'foundry' : 'legacy'}`}
      />
    </MenuAtom>
  );
}

function DrawerSnippetContent({ scene, snippetId }: DrawerSnippetHeaderProps) {
  const {
    descriptor: { navigation, options }
  } = scene;
  const legacyMode = useLegacyMode();
  const { pressable } = useColorRoles();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const snippetSource = filteredSnippets[snippetId].codeSource;
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  const menuAnchor = (
    <AppbarActionAtom
      color={pressable.tint}
      icon={Platform.select({
        ios: 'dots-horizontal',
        default: 'dots-vertical'
      })}
      onPress={() => setMenuVisible(true)}
    />
  );
  return (
    <>
      <AppbarActionAtom icon="menu" onPress={onMenuPress} />
      <AppbarContentAtom
        subtitle={`(${legacyMode ? 'L' : 'F'}) ${snippetSource}`}
        title={options.title}
      />
      <CardColorRolesProvider>
        <MenuContent
          anchor={menuAnchor}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          navigation={navigation}
          snippetId={snippetId}
        />
      </CardColorRolesProvider>
    </>
  );
}

const DrawerSnippetHeader = React.memo(function DrawerHeader(
  props: DrawerSnippetHeaderProps
) {
  return (
    <HeaderMolecule>
      <DrawerSnippetContent {...props} />
    </HeaderMolecule>
  );
});

DrawerSnippetHeader.displayName = 'MemoizedDrawerSnippetHeader';

export default DrawerSnippetHeader;
