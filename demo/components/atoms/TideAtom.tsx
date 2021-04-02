import React, { ComponentProps, ReactNode } from 'react';
import { Inline, Stack, useSpacing } from '@mobily/stacks';
import { ViewStyle, StyleProp, View, AccessibilityProps } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import BoxNucleon from '../nucleons/BoxNucleon';
import TextNucleon from '../nucleons/TextNucleon';
import contentWidthContextNucleon from '../nucleons/contentWidthContextNucleon';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import IconNucleon, { IconName } from '../nucleons/IconNucleon';
import GestureHandlerAdapterNucleon from '../nucleons/GestureHandlerAdapterNucleon';
import { useColorRoles } from '../../state/colorSystem';

export interface TideAtomProps extends AccessibilityProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  active?: boolean;
  right?: ReactNode | (() => ReactNode);
  bottom?: ReactNode | (() => ReactNode);
  onPress?: ComponentProps<typeof TouchableRipple>['onPress'];
}

const ICON_SIZE = 25;
const RIGHT_WIDTH = 40;
const COMPONENT_PADDING = 2;
const INLINE_SPACING = 4;

function ConditionalTouchable({ children, onPress, ...other }: any) {
  const { pressable } = useColorRoles();
  return onPress ? (
    <GestureHandlerAdapterNucleon onPress={onPress} {...other}>
      <TouchableRipple
        rippleColor={pressable.ripple}
        onPress={onPress}
        {...other}>
        {children}
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  ) : (
    <>{children}</>
  );
}

export default function TideAtom({
  style,
  title,
  leftIconName,
  right,
  bottom,
  onPress,
  rightIconName,
  active,
  ...accessibilityProps
}: TideAtomProps) {
  const isSelectable = typeof active === 'boolean';
  const { pressable, selectable, softIconColor } = useColorRoles();
  const displayRight = !!(right || rightIconName);
  const displayBottom = !!bottom;
  const displayLeft = !!leftIconName;
  const inlineSpaces = Number(displayRight) + 1;
  const hzSpace = useSpacing(
    (COMPONENT_PADDING + INLINE_SPACING * inlineSpaces) * 2
  );
  const backgroundColor = isSelectable
    ? active && onPress
      ? selectable.activeBackground
      : selectable.inactiveBackground
    : pressable.background;
  const contentColor = isSelectable
    ? active
      ? selectable.activeTint
      : selectable.inactiveTint
    : pressable.tint;
  const iconColor =
    isSelectable && active ? selectable.activeTint : softIconColor;
  const bottomContentWidth =
    useNuclearContentWidth() -
    ICON_SIZE -
    hzSpace -
    Number(displayRight) * RIGHT_WIDTH;
  return (
    <View
      style={[
        style,
        {
          backgroundColor
        }
      ]}>
      <ConditionalTouchable onPress={onPress} {...accessibilityProps}>
        <BoxNucleon padding={COMPONENT_PADDING}>
          <Inline space={INLINE_SPACING}>
            {displayLeft && (
              <BoxNucleon alignY="center">
                <IconNucleon
                  color={iconColor}
                  size={ICON_SIZE}
                  name={leftIconName!}
                />
              </BoxNucleon>
            )}
            <BoxNucleon alignY="center" grow wrap="nowrap">
              <Stack space={2}>
                <TextNucleon color={contentColor}>{title}</TextNucleon>
                {displayBottom && (
                  <View style={{ width: bottomContentWidth }}>
                    <contentWidthContextNucleon.Provider
                      value={bottomContentWidth}>
                      {typeof bottom === 'function' ? bottom() : bottom}
                    </contentWidthContextNucleon.Provider>
                  </View>
                )}
              </Stack>
            </BoxNucleon>
            {displayRight && (
              <BoxNucleon alignY="center" style={{ width: RIGHT_WIDTH }}>
                {typeof right === 'function'
                  ? right()
                  : right ||
                    (rightIconName ? (
                      <IconNucleon size={ICON_SIZE} name={rightIconName} />
                    ) : null)}
              </BoxNucleon>
            )}
          </Inline>
        </BoxNucleon>
      </ConditionalTouchable>
    </View>
  );
}
