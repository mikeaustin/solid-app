import { createSignal, createEffect, splitProps, Component, ComponentProps } from 'solid-js';

import View from './components/view';
import Text from './components/text';

import solidLogo from './assets/solid.svg';
import viteLogo from '/vite.svg';

import './App.css';

type Point = {
  clientX: number;
  clientY: number;
};

type HandleProps = {
  onDragStart?: () => void;
  onDragMove?: (x: number, y: number) => void;
} & ComponentProps<typeof View>;

function Handle(props: HandleProps) {
  const [localProps, restProps] = splitProps(props, ['onDragStart', 'onDragMove']);

  const [firstPoint, setFirstPoint] = createSignal<Point | null>(null);

  // let ref: HTMLDivElement | undefined;

  const handlePointerDown = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLElement;

    target.setPointerCapture(event.pointerId);

    setFirstPoint({
      clientX: event.clientX,
      clientY: event.clientY,
    });

    localProps.onDragStart?.();
  };

  const handlePointerMove = (event: PointerEvent) => {
    const _firstPoint = firstPoint();

    if (_firstPoint) {
      localProps.onDragMove?.(
        event.clientX - _firstPoint.clientX,
        event.clientY - _firstPoint.clientY
      );
    }
  };

  const handlePointerUp = (event: PointerEvent) => {
    setFirstPoint(null);
  };

  return (
    <View
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...props}
    />
  );
}

function Window() {
  let ref: HTMLDivElement | undefined;

  const [firstPoint, setFirstPoint] = createSignal<Point | null>(null);

  const handleDragStart = () => {
    if (ref) {
      setFirstPoint({
        clientX: ref.offsetLeft,
        clientY: ref.offsetTop,
      });
    }
  };

  const handleDragMove = (x: number, y: number) => {
    const _firstPoint = firstPoint();

    if (ref && _firstPoint) {
      ref.style.left = `${_firstPoint.clientX + x}px`;
      ref.style.top = `${_firstPoint.clientY + y}px`;
    }
  };

  return (
    <View ref={ref} absolute width={500} height={300}>
      <Handle fillColor="red-5" height={30} onDragStart={handleDragStart} onDragMove={handleDragMove} />
      <View flex fillColor="green-5">
        <Text>Hello</Text>
      </View>
    </View>
  );
}

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <Window />
      <Window />
      {/* <Handle absolute fillColor="blue-5" />
      <Handle absolute fillColor="green-5" /> */}
      <Text>Hello</Text>

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
