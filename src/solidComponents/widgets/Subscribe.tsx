import { type Component } from 'solid-js';
import React from 'react';
// import { Input, Textarea } from '../ui/Form';

const Subscribe: Component = () => {
  return (
      <form method="post" action="https://email.endlessrange.com/subscription/form">
        <div>
          <h2 class="flex flex-wrap font-bold leading-tighter tracking-tighter font-heading text-heading text-center text-3xl md:text-4xl">
            Subscribe for updates
          </h2>
          <input type="hidden" name="nonce" />

          <p>
            <input type="email" name="email" required placeholder="E-mail" />
          </p>
          <p>
            <input type="text" name="name" placeholder="Name (optional)" />
          </p>

          <p>
            <input id="cd0e1" type="checkbox" name="l" checked value="cd0e156f-691e-4b89-9f33-4f53304a3e5a" />
            <label for="cd0e1">Pixlie</label>
          </p>

          <input type="submit" value="Subscribe " />
        </div>
      </form>
  );
};

export default Subscribe;
