import { type Component } from 'solid-js';

const PercentageWords: Component = ({ data }: { data: { label: string; value: number }[] }) => {
  return (
    <div class="justify-center flex flex-wrap gap-12">
      {data?.map(({ label, value }) => (
        <a
          href={`https://www.google.com/search?q=${label}`}
          target="_blank"
          rel="noreferrer"
          class="flex justify-center items-center"
        >
          <p
            style={{
              'font-size': `${Math.max(value / 2, 12)}px`,
            }}
            class="text text-center"
          >
            {label}
          </p>
        </a>
      ))}
    </div>
  );
};

export default PercentageWords;
