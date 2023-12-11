import { JSX, createSignal, createEffect, splitProps, Component, ParentProps, ComponentProps } from 'solid-js';

import styles from './View.module.scss';
import fillColorStyles from '../../styles/fillColor.module.scss';

type Color = 'red-5' | 'green-5' | 'blue-5';

type ViewProps = {
  flex?: boolean;
  absolute?: boolean;
  width?: number;
  height?: number;
  fillColor?: Color;
} & ComponentProps<'div'>;

function View(props: ViewProps) {
  const [localProps, restProps] = splitProps(props, [
    'children', 'absolute', 'flex', 'width', 'height', 'fillColor'
  ]);

  const viewStyle = {
    width: `${localProps.width}px`,
    height: `${localProps.height}px`,
  };

  const classList = {
    [styles.View]: true,
    [styles.flex]: localProps.flex,
    [styles.absolute]: localProps.absolute,
    [fillColorStyles[localProps.fillColor ?? '']]: true,
  };

  return (
    <div classList={classList} style={viewStyle} {...restProps}>
      {localProps.children}
    </div>
  );
};

export default View;
