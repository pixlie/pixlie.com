import { type Component } from 'solid-js';

interface IData {
  name: string;
  value: number;
  url?: string;
}

enum TypeChoices {
//   average = 'average',
  percentage = 'percentage',
  ratio = 'ratio',
  list = 'list',
}

// TODO: finish this

// const Average = ({ data }: { data: IData[] }) => {
//   return <p class="text md:text-xl text-primary text-center font-bold">WIP</p>;
// };

const Percentage = ({ data }: { data: IData[] }) => {
  return (
    <div class="flex flex-col h-full w-full md:h-1/2 md:w-1/2 items-center justify-center gap-2">
      <p class="text md:text-xl text-primary text-center font-bold">All Startups</p>
      <div class="flex h-full w-full relative items-center justify-center aspect-square rounded-full bg-gray-100 shadow">
        {data?.map(({ name, value }, i) => (
          <div class="absolute bottom-0 flex flex-col h-full w-full  items-center justify-end gap-2">
            <p class="text md:text-xl  text-primary text-center font-bold">
              All Startups <span class="underline underline-offset-2">{`with ${name}`}</span>
            </p>
            <div
              class={`flex items-center justify-center aspect-square rounded-full bg-blue-${i + 1}00 shadow`}
              style={{
                height: `${value}%`,
                width: `${value}%`,
              }}
            >
              {/* <p class="text md:text-xl text-primary text-center font-bold">{`${value}%`}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Ratio = ({ data }: { data: IData[] }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const size = (value: number) => Math.max((value / maxValue) * 100, 1);
  return (
    <div class="flex h-full w-full md:h-1/2 md:w-1/2 items-center justify-center gap-6">
      {data?.map(({ name, value }) => (
        <div
          class="flex items-center justify-center aspect-square rounded-full bg-blue-100 shadow"
          style={{
            height: `${size(value)}%`,
            width: `${size(value)}%`,
          }}
        >
          <p class="text md:text-xl text-primary text-center font-bold">{name}</p>
        </div>
      ))}
    </div>
  );
};

const List = ({ data }: { data: IData[] }) => (
  <div class="flex w-full md:w-auto flex-col gap-6">
    {data?.map(({ name, url }, i) => (
      <div class="flex justify-start items-center gap-6">
        <span class="flex w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl font-bold rounded-full bg-blue-100 text-primary">
          {i + 1}
        </span>
        <a
          href={`https://www.google.com/search?q=${name}`}
          target="_blank"
          rel="noreferrer"
          style={{ flex: 1 }}
          class="text md:text-xl text-primary font-bold"
        >
          {name}
        </a>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" class="text-xl">
            🔗
          </a>
        )}
      </div>
    ))}
  </div>
);

const InsightsResults: Component = ({
  results,
}: {
  results: {
    insight: string;
    type: TypeChoices;
    data: IData[];
  }[];
}) => (
  <div class="flex flex-col gap-24 md:gap-32 lg:gap-40">
    {results?.map(({ type, insight, data }) => (
      <div class="flex flex-col justify-center items-center gap-6 px-6">
        <h2 class="flex flex-wrap font-bold leading-tighter tracking-tighter font-heading text-heading text-center text-3xl md:text-4xl">
          {insight}
        </h2>
        {/* {type === TypeChoices.average && <Average data={data} />} */}
        {type === TypeChoices.percentage && <Percentage data={data} />}
        {type === TypeChoices.ratio && <Ratio data={data} />}
        {type === TypeChoices.list && <List data={data} />}
      </div>
    ))}
  </div>
);

export default InsightsResults;
