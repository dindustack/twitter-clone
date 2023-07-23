interface FormInputProps {
  autoComplete?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  autoComplete,
  disabled,
  onChange,
  placeholder,
  type,
  value,
}) => {
  return (
    <input
      data-testid="form-input"
      disabled={disabled}
      onChange={onChange}
      autoComplete={autoComplete}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
      w-full
      p-4
      text-lg
      bg-black
      border-2
      border-neutral-800
      rounded-md
      outline-none
      text-white
      focus:border-sky-500
      focus:border-2
      transition
      disabled:bg-neutral-900
      disabled:opacity-70
      disabled:cursor-not-allowed
      "
    />
  );
};
