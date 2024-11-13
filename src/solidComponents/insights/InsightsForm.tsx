import { createResource, createSignal, type Component, onMount } from 'solid-js';
import { Dropdown, Input, NumberInput, Slider } from '../ui/Form';

interface IInputOptions {
  country_options: string[];
  domain_options: string[];
  stage_options: string[];
  question_options: string[];
}

interface IInputData {
  company: string;
  website: string;
  country: string;
  domain: string;
  stage: string;
  funding: number;
  revenue: number;
  runway: number;
  employees: number;
  founders: number;
  question: string;
}

interface IInsight {
  label: string;
  data: {
    unit: string;
    value: number;
    filter: string;
    reference: string;
    action: string;
    goal: string;
    timeframe: string;
  };
}

const InsightsForm: Component = () => {
  const [data, setData] = createSignal<IInputData>({
    company: '',
    website: '',
    country: '',
    domain: '',
    stage: '',
    funding: 0,
    revenue: 0,
    runway: 0,
    employees: 0,
    founders: 0,
    question: '',
  });

  const [options, setOptions] = createSignal<IInputOptions>({
    country_options: ['Canada', 'Estonia', 'India', 'United States'],
    domain_options: ['Engineering', 'Growth'],
    stage_options: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'IPO'],
    question_options: [
      'Other startups in the same domain as my startup',
      'Investors who might be interested in my startup',
    ],
  });

  const getOptions = async () => {
    const endpoint = '';
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setOptions(data);
    }
  };
  onMount(() => {
    getOptions();
  });

  const generateInsights = async () => {
    if (!data().company || !data().website) {
      return false;
    }
    const endpoint = '';
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data()),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return await response.json();
    }
  };
  const [insights, { refetch }] = createResource<IInsight[]>(() => generateInsights());

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onSubmit = (e: Event) => {
    refetch();
    e.preventDefault();
  };

  return (
    <>
      <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
        {insights() ? (
          <div class="py-8">Thank you {data().company.split(' ')[0]}!</div>
        ) : (
          <form onSubmit={onSubmit}>
            <Input label="Company" name="company" value={data().company} onChange={onChange} />

            <Input label="Website" name="website" value={data().website} onChange={onChange} />

            <Dropdown
              label="Country"
              name="country"
              options={options().country_options}
              value={data().country}
              onChange={onChange}
            />

            <Dropdown
              label="Domain"
              name="domain"
              options={options().domain_options}
              value={data().domain}
              onChange={onChange}
            />

            <Dropdown
              label="Stage"
              name="stage"
              options={['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'IPO']}
              value={data().stage}
              onChange={onChange}
            />

            <div class="flex items-center gap-6">
              <NumberInput label="Founders" name="founders" value={data().founders} onChange={onChange} />
              <NumberInput label="Employees" name="employees" value={data().employees} onChange={onChange} />
            </div>

            <Slider
              label="Funding ($M)"
              name="funding"
              min={0}
              max={100}
              prefix="$"
              suffix="M"
              value={data().funding}
              onChange={onChange}
            />

            <Slider
              label="Revenue ($M)"
              name="revenue"
              min={0}
              max={100}
              prefix="$"
              suffix="M"
              value={data().revenue}
              onChange={onChange}
            />

            <Slider
              label="Runway (months)"
              name="runway"
              min={0}
              max={100}
              suffix=" months"
              value={data().runway}
              onChange={onChange}
            />

            <Dropdown
              label="Tell me about"
              name="industry"
              options={options().question_options}
              value={data().question}
              onChange={onChange}
            />

            <div class="mt-10 grid">
              <button class="btn btn-primary">Generate Insights</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default InsightsForm;
