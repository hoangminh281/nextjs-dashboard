import { RadioGroupType } from "@/app/ui/common/lib/definitions";
import Radio from "@/app/ui/common/radio";

const RadioGroup = ({
  label,
  name,
  defaultValue,
  options = [],
  errors,
}: RadioGroupType) => {
  return (
    <fieldset className="mb-4">
      <legend className="mb-2 block text-sm font-medium">{label}</legend>
      <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
        <div className="flex gap-4 flex-wrap">
          {options.map((option) => (
            <Radio
              key={option.id}
              {...option}
              name={name}
              defaultChecked={
                option.defaultChecked ?? defaultValue === option.value
              }
            />
          ))}
        </div>
      </div>
      <div id="status-error" aria-live="polite" aria-atomic="true">
        {errors &&
          errors.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
