import { RadioType } from "@/app/ui/common/lib/definitions";
import Tooltip from "@/app/ui/common/tooltip";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const Radio = ({
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

export default Radio;
