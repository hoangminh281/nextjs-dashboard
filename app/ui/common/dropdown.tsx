import { DropdownType } from "@/app/ui/common/lib/definitions";
import Spin from "@/app/ui/common/spin";
import clsx from "clsx";

const Dropdown = ({ options, onSelect }: DropdownType) => {
  return (
    <div
      className={clsx(
        "absolute top-full left-0 right-0 mt-2 rounded-md bg-white p-2 shadow-md invisible opacity-0 translate-y-3 transition-all",
        {
          "group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0":
            options !== undefined,
        },
      )}
    >
      {options?.map((option) => (
        <div
          key={option.value}
          className="text-sm hover:bg-gray-50 p-2 rounded-md cursor-pointer"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </div>
      ))}
      <div
        hidden={options === null || !!options?.length}
        className="text-sm p-2 rounded-md text-center"
      >
        No result
      </div>
      <div hidden={options !== null}>
        <div className="text-sm flex justify-center">
          <Spin />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
