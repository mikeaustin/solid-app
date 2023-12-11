import { createSignal, createEffect, splitProps, Component } from 'solid-js';

import solidLogo from './assets/solid.svg';
import viteLogo from '/vite.svg';

import styles from './App.module.scss';
import './App.css';

type Point = {
  clientX: number;
  clientY: number;
};

type ViewProps = {
  absolute?: boolean;
};

// const View: Component<{ absolute?: boolean; }> = (props) => {
function View(props: ViewProps) {
  const [local, restProps] = splitProps(props, ['absolute']);

  const [firstPoint, setFirstPoint] = createSignal<Point | null>(null);

  let ref: HTMLDivElement | undefined;

  const handlePointerDown = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLElement;

    target.setPointerCapture(event.pointerId);

    setFirstPoint({
      clientX: event.clientX - target.offsetLeft,
      clientY: event.clientY - target.offsetTop,
    });
  };

  const handlePointerMove = (event: PointerEvent) => {
    const _firstPoint = firstPoint();

    if (ref && _firstPoint) {
      ref.style.left = `${event.clientX - _firstPoint.clientX}px`;
      ref.style.top = `${event.clientY - _firstPoint.clientY}px`;
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    setFirstPoint(null);
  };

  const classList = {
    [styles.absolute]: local.absolute,
  };

  return (
    <div
      ref={ref}
      class={styles.View}
      classList={classList}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <View absolute />
      <View absolute />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  );
}

export default App;
