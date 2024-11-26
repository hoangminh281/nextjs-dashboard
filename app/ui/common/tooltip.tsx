import { TooltipType } from "@/app/ui/common/lib/definitions";
import { useRef } from "react";

const Tooltip = ({ content, children }: TooltipType) => {
  const ref = useRef<HTMLDivElement>(null);

  const hover = () => {
    if (!ref.current) {
      return;
    }

    ref.current.classList.replace("opacity-0", "opacity-1");
    ref.current.classList.replace("invisible", "visible");
  };
  const unhover = () => {
    if (!ref.current) {
      return;
    }

    ref.current?.classList.replace("opacity-1", "opacity-0");
    ref.current?.classList.replace("visible", "invisible");
  };

  return (
    <div
      className="relative"
      data-tooltip-target="tooltip-animation"
      data-tooltip-trigger="hover"
      onMouseEnter={hover}
      onMouseLeave={unhover}
    >
      {children}
      <div
        ref={ref}
        id="tooltip"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 w-80 bottom-full left-1/2 -translate-x-1/2 mb-2"
      >
        {content}
        <div
          className="tooltip-arrow absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"
          data-popper-arrow
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
