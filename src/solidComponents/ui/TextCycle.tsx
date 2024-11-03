import { createSignal, onCleanup, type Component, onMount } from 'solid-js';

const lines = ['Founders', 'Investors', 'Competitors', 'Partnerships'];

const TextCycle: Component = () => {
  const [currentLineIndex, setCurrentLineIndex] = createSignal(0);
  const [transitioning, setTransitioning] = createSignal(false);

  onMount(() => {
    setCurrentLineIndex(0);
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        setTransitioning(false);
      }, 200);
    }, 2000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="text-scroller h-18 md:h-28">
      <h1
        class={`text-6xl md:text-8xl leading-tighter tracking-tighter font-heading dark:text-gray-200 line ${transitioning() ? 'slide-out' : 'slide-in'}`}
      >
        {lines[currentLineIndex()]}
      </h1>
    </div>
  );
};

export default TextCycle;
