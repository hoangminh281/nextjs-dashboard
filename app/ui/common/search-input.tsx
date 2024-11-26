"use client";

import {
  DropdownOptionType,
  SearchInputType,
} from "@/app/ui/common/lib/definitions";
import clsx from "clsx";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import Dropdown from "./dropdown";

export default function SearchInput({
  id,
  name,
  label,
  placeholder,
  Icon,
  errors,
  values = [],
  options,
  onEnter = () => null,
  onSearch = () => null,
  onSelect = () => null,
}: SearchInputType) {
  const ref = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    const target = e.target as HTMLInputElement;

    onEnter(target.value);
    target.blur();
    target.value = "";
  };

  const handleSearch = useDebouncedCallback((term) => {
    onSearch(term);
  }, 300);

  const handleSelect = (option: DropdownOptionType) => {
    onSelect(option);

    if (ref.current) {
      ref.current.blur();
      ref.current.value = "";
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div
        className="group relative flex items-center gap-1 rounded-md border border-gray-200 pl-10 py-[9px] pr-[9px] has-[:focus]:ring-2 has-[:focus]:ring-blue-600 bg-white"
        tabIndex={0}
        onFocus={() => ref.current?.focus()}
      >
        {values.map(({ label, value, themeColor }) => (
          <div
            key={value}
            className={clsx(
              "w-fit rounded-md px-1 py-0.5 text-sm cursor-pointer",
              themeColor,
            )}
          >
            {label}
          </div>
        ))}
        <input
          ref={ref}
          className="peer block border-none focus:ring-transparent text-sm placeholder:text-gray-500 p-0 w-full"
          id={id}
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <Dropdown options={options} onSelect={handleSelect} />
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
}
