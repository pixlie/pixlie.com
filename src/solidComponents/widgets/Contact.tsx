import { createResource, createSignal, type Component } from 'solid-js';
import { Input, Textarea } from '../ui/Form';

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
    const response = await fetch('https://website-api.pixlie.com/contact', {
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

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (e: Event) => {
    submitFormData();
    e.preventDefault();
  };

  return (
    <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
      {submitted() ? (
        <div class="py-8">Thank you {formData().name.split(' ')[0]}!</div>
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
