import type { Component } from 'solid-js';
import { Input, Textarea } from '../ui/Form';

const Contact: Component = () => {
  {
    /* <WidgetWrapper id={id} isDark={isDark} containerClass={`max-w-7xl mx-auto ${classes?.container ?? ''}`} bg={bg}>
  <Headline title={title} subtitle={subtitle} tagline={tagline} /> */
  }

  return (
    <div class="flex flex-col max-w-xl mx-auto rounded-lg backdrop-blur border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow p-4 sm:p-6 lg:p-8 w-full">
      <form>
        <Input label="Name" name="name" placeholder="Name" />
        <Input label="Email" name="email" placeholder="Email" />
        <Textarea label="Message" name="message" placeholder="Message" />

        <div class="mt-10 grid">
          <button class="btn btn-primary">Contact us</button>
        </div>
      </form>
    </div>
  );
  // </WidgetWrapper>
};

export default Contact;
