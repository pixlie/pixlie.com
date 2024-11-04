import { createResource, createSignal, type Component } from 'solid-js';
import { Dropdown, Input, Slider } from '../ui/Form';

interface IFormData {
  country: string;
  industry: string;
  stage: string;
  company: string;
  website: string;
  funding: number;
  revenue: number;
  runway: number;
}

const Insights: Component = () => {
  const [formData, setFormData] = createSignal<IFormData>({
    country: '',
    industry: '',
    stage: '',
    company: '',
    website: '',
    funding: 0,
    revenue: 0,
    runway: 0,
  });

  //   const sendFormData = async () => {
  //     if (!formData().name || !formData().email) {
  //       return false;
  //     }
  //     const response = await fetch('https://website-api.pixlie.com/contact', {
  //       method: 'POST',
  //       body: JSON.stringify(formData()),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (response.ok) {
  //       return true;
  //     }
  //     return false;
  //   };
  //   const [submitted, { refetch: submitFormData }] = createResource(sendFormData);

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  //   const handleSubmit = (e: Event) => {
  //     submitFormData();
  //     e.preventDefault();
  //   };

  return (
    <>
      <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
        {/* {submitted() ? (
        <div class="py-8">Thank you {formData().name.split(' ')[0]}!</div>
      ) : ( */}
        <form>
          {/* <form onSubmit={handleSubmit}> */}
          <Dropdown
            label="Country"
            name="country"
            options={['Canada', 'Estonia', 'India', 'United States']}
            value={formData().country}
            onChange={handleChange}
          />
          <Dropdown
            label="Industry"
            name="industry"
            options={['Engineering', 'Growth']}
            value={formData().industry}
            onChange={handleChange}
          />

          <Dropdown
            label="Stage"
            name="stage"
            options={['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'IPO']}
            value={formData().stage}
            onChange={handleChange}
          />
          <Input label="Company" name="company" value={formData().company} onChange={handleChange} />
          <Input label="Website" name="website" value={formData().website} onChange={handleChange} />

          <Slider
            label="Funding"
            name="funding"
            min={0}
            max={100}
            prefix="$"
            suffix="M +"
            value={formData().funding}
            onChange={handleChange}
          />

          <Slider
            label="Revenue"
            name="revenue"
            min={0}
            max={100}
            prefix="$"
            suffix="M +"
            value={formData().revenue}
            onChange={handleChange}
          />

          <Slider
            label="Runway"
            name="runway"
            min={0}
            max={100}
            suffix=" months +"
            value={formData().runway}
            onChange={handleChange}
          />

          <Dropdown
            label="What are you looking for?"
            name="industry"
            options={['Funding', 'Investors', 'Competitors', 'Partnerships', 'Customers']}
            value={formData().industry}
            onChange={handleChange}
          />

          {/* <Input label="Name" name="name" placeholder="Name" value={formData().name} onChange={handleChange} />
        <Input label="Email" name="email" placeholder="Email" value={formData().email} onChange={handleChange} />
        <div class="mt-10 grid">
          <button class="btn btn-primary">Save Results</button>
        </div> */}
        </form>
      </div>
      <div class="mt-12 max-w-xs sm:max-w-md m-auto flex flex-nowrap flex-col sm:flex-row sm:justify-center">
        <a href="/insights/startups/results" class="btn btn-primary">
          Get Insights
        </a>
      </div>
    </>
  );
};

export default Insights;
