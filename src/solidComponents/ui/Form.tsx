import type { Component } from 'solid-js';

interface ILabelProps {
  for?: string;
  label: string;
}

const Label: Component<ILabelProps> = (props) => {
  return (
    <label for={props.for} class="block text-sm font-medium">
      {props.label}
    </label>
  );
};

interface IInputProps {
  type?: string;
  name?: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
  value?: string | number | string[] | undefined;
  onChange?: (e: Event) => void | undefined;
}

const Input: Component<IInputProps> = (props) => {
  return (
    <div class="mb-6">
      {!!props.label && <Label for={props.name} label={props.label} />}
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        autocomplete={props.autocomplete}
        placeholder={props.placeholder}
        class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

interface ITextareaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  value?: string | number | string[] | undefined;
  onChange?: (e: Event) => void | undefined;
}

const Textarea: Component<ITextareaProps> = (props) => {
  return (
    <div class="mb-6">
      {!!props.label && <Label for={props.name} label={props.label} />}
      <textarea
        id={props.name}
        name={props.name ? props.name : 'message'}
        rows={props.rows ? props.rows : 4}
        placeholder={props.placeholder}
        class="py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export { Label, Input, Textarea };
