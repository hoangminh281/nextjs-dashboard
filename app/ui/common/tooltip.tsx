import { TooltipType } from "@/app/ui/common/lib/definitions";

const Tooltip = ({ content, children }: TooltipType) => {
  return (
    <div
      className="group relative"
      data-tooltip-target="tooltip-animation"
      data-tooltip-trigger="hover"
    >
      {children}
      <div
        id="tooltip"
        role="tooltip"
        className="absolute z-10 invisible opacity-0 group-hover:visible group-hover:opacity-100 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 w-80 bottom-full left-1/2 -translate-x-1/2 mb-2"
      >
        {content}
        <div
          className="tooltip-arrow absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900 dark:border-t-gray-700"
          data-popper-arrow
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
