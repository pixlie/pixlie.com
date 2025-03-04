import { createResource, createSignal, type Component } from 'solid-js';
import { Input, Textarea } from '../ui/Form';
import { useRecaptcha } from './useRecaptcha';

interface IFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: Component = () => {
  const [formData, setFormData] = createSignal<IFormData>({
    name: '',
    email: '',
    message: '',
  });
  const sendFormData = async () => {
    if (!formData().name || !formData().email) {
      return false;
    }
    const response = await fetch('https://endless-rage-production.up.railway.app/contact', {
      method: 'POST',
      body: JSON.stringify(formData()),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return true;
    }
    return false;
  };
  const [submitted, { refetch: submitFormData }] = createResource(sendFormData);
  const { isNotARobot } = useRecaptcha();

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (await isNotARobot()) {
      submitFormData();
    } else {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div
      class={
        'flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full ' +
        (submitted() ? 'border-green-500' : 'border-gray-200 dark:border-gray-700')
      }
    >
      {submitted() ? (
          <div class="flex items-center justify-center gap-1">
            <p class="text-md font-semibold">Sent!</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" value={formData().name} onChange={handleChange} />
          <Input label="Email" name="email" value={formData().email} onChange={handleChange} />
          <Textarea label="Message" name="message" value={formData().message} onChange={handleChange} />
          <div class="mt-10 grid">
            <button class="btn btn-primary">Contact Us</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
