import { ButtonType } from "@/app/ui/common/lib/definitions";
import clsx from "clsx";

const THEME = {
  primary: "bg-blue-500 hover:bg-blue-400 text-white active:bg-blue-600",
  secondary:
    "bg-white hover:bg-gray-50 ring-2 ring-gray-100 text-black active:bg-gray-100",
};

const Button = ({
  variant = "primary",
  Icon,
  className,
  children,
  ...rest
}: ButtonType) => {
  return (
    <button
      {...rest}
      className={clsx(
        "group flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
        THEME[variant],
      )}
    >
      {Icon && (
        <Icon className="h-4 w-4 text-gray-500 transition duration-300 group-hover:rotate-180 mr-1" />
      )}
      {children}
    </button>
  );
};

export default Button;
