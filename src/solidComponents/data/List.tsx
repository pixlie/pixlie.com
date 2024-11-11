import { type Component } from 'solid-js';

const List: Component = ({ data }: { data: { label: string; value: number }[] }) => {
  const half = Math.ceil(data.length / 2);
  const firstHalf = data.slice(0, half);
  const secondHalf = data.slice(half, data.length);
  return (
    <div class="flex flex-col md:flex-row justify-center items-center gap-6">
      <div class="flex flex-col gap-6">
        {firstHalf?.map(({ label }, i) => (
          <div class="flex items-start gap-4">
            <p class="text">{`${i + 1}. `}</p>
            <div>
              <a href={`https://www.google.com/search?q=${label}`} target="_blank" rel="noreferrer">
                <p class="text text-secondary font-semibold">{label}</p>
                <p class="text text-muted">Invested in [CompanyName] this [TimeFrame]</p>
                <p class="text">[ContactInfo]</p>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div class="flex flex-col gap-6">
        {secondHalf?.map(({ label }, i) => (
          <div class="flex items-start gap-4">
            <p class="text">{`${i + 1 + firstHalf.length}. `}</p>
            <div>
              <a href={`https://www.google.com/search?q=${label}`} target="_blank" rel="noreferrer">
                <p class="text text-secondary font-semibold">{label}</p>
                <p class="text text-muted">Invested in [CompanyName] this [TimeFrame]</p>
                <p class="text">[ContactInfo]</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
