import { createSignal, type Component } from 'solid-js';
import { Input, Label } from '../ui/Form';

interface IFormData {
  company: string;
  website: string;
  looking_for: string;
}

const CustomStartupInsightsForm: Component = () => {
  const [formData, setFormData] = createSignal<IFormData>({
    company: '',
    website: '',
    looking_for: '',
  });

  const looking_for_choices = ['Investors', 'Competitors', 'Partnerships', 'All'];

  return (
    <>
      <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
        <form>
          <Input
            label="Company"
            name="company"
            placeholder='e.g. "Pixlie"'
            value={formData().company}
            onChange={(e: Event) => {
              const inputElement = e.target as HTMLInputElement;
              setFormData((prev) => ({ ...prev, company: inputElement.value }));
            }}
          />

          <Input
            label="Website"
            name="website"
            placeholder='e.g. "pixlie.com"'
            value={formData().website}
            onChange={(e: Event) => {
              const inputElement = e.target as HTMLInputElement;
              setFormData((prev) => ({ ...prev, website: inputElement.value }));
            }}
          />

          <div class="mb-6">
            <Label for="looking_for" label="What are you looking for?" />
            <div class="flex flex-col md:flex-row gap-2 justify-between mt-2 px-4">
              {looking_for_choices.map((choice) => (
                <div class="flex gap-2">
                  <input
                    type="checkbox"
                    id={choice}
                    name={choice}
                    value={formData().looking_for === choice}
                    onChange={() => setFormData((prev) => ({ ...prev, looking_for: choice }))}
                  />
                  <label for={choice}>{choice}</label>
                </div>
              ))}
            </div>
          </div>
        </form>

        <a href="/insights/startups/results" class="btn btn-primary">
          Generate Insights
        </a>
      </div>
    </>
  );
};

export default CustomStartupInsightsForm;
