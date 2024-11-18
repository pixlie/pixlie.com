import { type Component } from 'solid-js';
import { Input } from '../ui/Form';

const Subscribe: Component = () => {
  return (
    <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
      <form method="post" action="https://email.endlessrange.com/subscription/form">
        <div>
          <input type="hidden" name="nonce" />
          <Input type="text" label="Name" name="name" />
          <Input type="email" label="Email" name="email" required />
          <p class="hidden">
            <input id="cd0e1" type="checkbox" name="l" checked value="cd0e156f-691e-4b89-9f33-4f53304a3e5a" />
            <label for="cd0e1">Pixlie</label>
          </p>
          <div class="mt-10 grid">
            <input type="submit" value="Subscribe " class="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
