import { createSignal, createEffect, splitProps, Component } from 'solid-js';

import styles from './View.module.scss';
import fillColorStyles from '../../styles/fillColor.module.scss';

type ViewProps = {
  children: string;
};

function Text(props: ViewProps) {
  const [local, restProps] = splitProps(props, ['children']);

  const classList = {
    // [styles.View]: true,
    // [styles.absolute]: local.absolute,
    // [fillColorStyles[local.fillColor ?? '']]: true,
  };

  return (
    <div classList={classList}>
      {local.children}
    </div>
  );
};

export default Text;
