import { TextareaType } from "@/app/ui/common/lib/definitions";

const Textarea = ({
  id,
  name,
  label,
  placeholder,
  defaultValue,
  Icon,
  errors,
}: TextareaType) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          rows={3}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby={id + "-error"}
        />
        <Icon className="pointer-events-none absolute left-3 top-2 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div id={id + "-error"} aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Textarea;
