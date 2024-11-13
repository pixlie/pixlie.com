import { type Component } from 'solid-js';

const ContactList: Component = ({
  data,
}: {
  data: { name: string; email?: string; phone?: string; url?: string }[];
}) => (
  <div class="flex flex-col gap-6 md:gap-12">
    {data?.map(({ name, email, phone, url }, i) => (
      <div class="flex justify-start items-center gap-3 md:gap-8">
        <span class="flex w-12 h-12 md:w-16 md:h-16 items-center justify-center text-xl font-bold rounded-full bg-blue-100 text-primary">
          {i + 1}
        </span>
        <div class="flex flex-col gap-2">
          <a
            href={`https://www.google.com/search?q=${name}`}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1 }}
            class="text-xl font-bold"
          >
            {name}
          </a>
          <div class="flex items-center gap-4">
            {email && (
              <a href={`mailto:${email}`} class="text-xl">
                📫
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} class="text-xl">
                ☎️
              </a>
            )}
            {url && (
              <a href={url} target="_blank" rel="noreferrer" class="text-xl">
                🔗
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ContactList;
