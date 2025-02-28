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
  required?: boolean;
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
        required={props.required}
        class="mt-3 py-3 px-4 outline-none block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
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
        class="mt-3 py-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

interface IDropdownProps {
  label?: string;
  name?: string;
  options: string[];
  value?: string | number | string[] | undefined;
  placeholder?: string;
  onChange?: (e: Event) => void | undefined;
}

const Dropdown: Component<IDropdownProps> = (props) => {
  return (
    <div class="mb-6">
      {!!props.label && <Label for={props.name} label={props.label} />}
      <div class="mt-3 px-4 block w-full text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900">
        <select
          id={props.name}
          name={props.name}
          class="py-3 block w-full bg-white dark:bg-slate-900 outline-none"
          value={props.value || props.placeholder}
          onChange={props.onChange}
        >
          <option value={props.placeholder}>{''}</option>
          {props.options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface ISliderProps {
  label?: string;
  name?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange?: (e: Event) => void | undefined;
}

const Slider: Component<ISliderProps> = (props) => {
  return (
    <div class="mb-6">
      {!!props.label && <Label for={props.name} label={props.label} />}
      <input
        type="range"
        id={props.name}
        name={props.name}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
        value={props.value}
        class="py-3 block w-full"
      />
      <div class="flex justify-between relative">
        <span />
        <span
          class="absolute"
          style={{
            left: `${(props.value / props.max) * 100}%`,
            transform: `translateX(-${props.value}%)`,
            top: '-8px',
          }}
        >
          {props.value}
          {props.value >= props.max ? '+' : ''}
        </span>
      </div>
    </div>
  );
};

interface INumberInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: number;
  onChange?: (e: Event) => void | undefined;
}

const NumberInput: Component<INumberInputProps> = (props) => {
  return (
    <div class="mb-6 w-full">
      {!!props.label && <Label for={props.name} label={props.label} />}
      <input
        type="number"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        class="mt-3 py-3 px-4 w-full outline-none block text-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

interface ICheckBoxProps {
  type?: string;
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: Event) => void | undefined;
}

const CheckBox: Component<ICheckBoxProps> = (props) => {
  return (
    <div class="flex gap-2">
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.checked ? 'true' : undefined}
        onChange={props.onChange}
      />
      <label for={props.label}>{props.label}</label>
    </div>
  );
};

export { Label, Input, Textarea, Dropdown, Slider, NumberInput, CheckBox };
