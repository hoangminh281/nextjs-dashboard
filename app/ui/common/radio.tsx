import { RadioGroupType, RadioType } from "@/app/ui/common/lib/definitions";
import Tooltip from "@/app/ui/common/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const RadioGroup = ({
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

export const Radio = ({
  id,
  name,
  label,
  value,
  Icon,
  bgColor = "bg-blue-500",
  defaultChecked,
  hint,
}: RadioType) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        className="peer h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 z-10"
        aria-describedby={id + "-error"}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={id}
        className={clsx(
          "ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white",
          bgColor,
        )}
      >
        {label}
        {Icon && <Icon hidden={!Icon} className="h-4 w-4" />}
        {hint && (
          <Tooltip content={hint}>
            <InformationCircleIcon className="h-4 w-4 text-white stroke-2" />
          </Tooltip>
        )}
      </label>
    </div>
  );
};
