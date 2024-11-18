import { createResource, type Component } from 'solid-js';

interface IData {
  type: TypeChoices;
  insight: string;
  items: IItem[];
}

interface IItem {
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

const DUMMY_DATA: IData[] = [
  {
    type: TypeChoices.percentage,
    insight: '✨ [blank]% of startups have [blank].',
    items: [
      { name: 'X', value: 75 },
      { name: 'Y', value: 50 },
      { name: 'Z', value: 25 },
    ],
  },
  {
    type: TypeChoices.ratio,
    insight: '💪 [blank] startups have twice as many [A] compared to [B].',
    items: [
      { name: 'A', value: 50 },
      { name: 'B', value: 25 },
    ],
  },
  {
    type: TypeChoices.list,
    insight: '🏆 Top 10 [blank] this week:',
    items: [
      { name: 'Name', value: 1 },
      { name: 'Name', value: 2 },
      { name: 'Name', value: 3, url: '[URL]' },
      { name: 'Name', value: 4, url: '[URL]' },
      { name: 'Name', value: 5, url: '[URL]' },
      { name: 'Name', value: 6 },
      { name: 'Name', value: 7, url: '[URL]' },
      { name: 'Name', value: 8 },
      { name: 'Name', value: 9 },
      { name: 'Name', value: 10, url: '[URL]' },
    ],
  },
];

// TODO: finish this

// const Average = ({ data }: { data: IData[] }) => {
//   return <p class="text md:text-xl text-primary text-center font-bold">WIP</p>;
// };

const Percentage = ({ items = [] }: { items: IItem[] }) => {
  const colors = [
    'rgb(219 234 254)',
    'rgb(191 219 254)',
    'rgb(147 197 253)',
    'rgb(96 165 250)',
    'rgb(59 130 246)',
    'rgb(37 99 235)',
    'rgb(29 78 216)',
    'rgb(30 64 175)',
    'rgb(30 58 138)',
  ];
  return (
    <div class="flex flex-col h-full w-full md:h-1/2 md:w-1/2 items-center justify-center gap-2">
      <p class="text md:text-xl text-primary text-center font-bold">All Startups</p>
      <div class="flex h-full w-full relative items-center justify-center aspect-square rounded-full bg-gray-100 shadow">
        {items.map(({ name, value }, i) => (
          <div class="absolute bottom-0 flex flex-col h-full w-full  items-center justify-end gap-2">
            <p class="text md:text-xl  text-primary text-center font-bold">
              All Startups <span class="underline underline-offset-2">{`with ${name}`}</span>
            </p>
            <div
              class={`flex items-center justify-center aspect-square rounded-full shadow`}
              style={{
                'background-color': colors[i],
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

const Ratio = ({ items = [] }: { items: IItem[] }) => {
  const maxValue = Math.max(...items.map((item) => item.value));
  const size = (value: number) => Math.max((value / maxValue) * 100, 1);
  return (
    <div class="flex h-full w-full md:h-1/2 md:w-1/2 items-center justify-center gap-6">
      {items.map(({ name, value }) => (
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

const List = ({ items = [] }: { items: IItem[] }) => (
  <div class="flex w-full md:w-auto flex-col gap-6">
    {items.map(({ name, value, url }) => (
      <div class="flex justify-start items-center gap-6">
        <span class="flex w-12 h-12 md:w-16 md:h-16 items-center justify-center text md:text-xl font-bold rounded-full bg-blue-100 text-primary">
          {value}
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
          <a href={url} target="_blank" rel="noreferrer" class="flex-1 text-right text md:text-xl">
            🔗
          </a>
        )}
      </div>
    ))}
  </div>
);

const InsightsResults: Component = () => {
  // TODO: get actual data and replace dummy data
  const getData = async () => {
    try {
      const response = await fetch('', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        return await response.json();
      }
      return DUMMY_DATA;
    } catch {
      return DUMMY_DATA;
    }
  };
  const [data] = createResource<IData[]>(() => getData());

  return (
    <div class="flex flex-col gap-24 md:gap-32 lg:gap-40">
      {data()?.map(({ type, insight, items }) => (
        <div class="flex flex-col justify-center items-center gap-6 px-6">
          <h2 class="flex flex-wrap font-bold leading-tighter tracking-tighter font-heading text-heading text-center text-3xl md:text-4xl">
            {insight}
          </h2>
          {/* {type === TypeChoices.average && <Average data={data} />} */}
          {type === TypeChoices.percentage && <Percentage items={items} />}
          {type === TypeChoices.ratio && <Ratio items={items} />}
          {type === TypeChoices.list && <List items={items} />}
        </div>
      ))}
    </div>
  );
};

export default InsightsResults;
