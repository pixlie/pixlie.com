import { type Component } from 'solid-js';

const Card: Component = ({ emoji, text }: { emoji: string; text: string }) => {
  return (
    <div class="w-full border text-center p-6 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600">
      <h1 class="text-6xl">{emoji}</h1>
      <p class="mt-4 font-medium text-xl">{text}</p>
    </div>
  );
};

export default Card;
