import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Children, cloneElement, ReactElement, ReactNode } from "react";
import { FloatButtonType } from "./lib/definitions";

export const FloatButtonGroup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-full px-3 py-4">
      <div className="flex flex-col items-end gap-3 w-fit sticky top-0 left-full z-10">
        {children}
      </div>
    </div>
  );
};

const COMBO: {
  [key: number]: { parent: string; childs: { [key: number]: string } };
} = {
  1: {
    parent: "hover:h-[76px]",
    childs: {
      0: "-translate-y-[42px]",
    },
  },
  2: {
    parent: "hover:h-[118px]",
    childs: {
      0: "-translate-y-[42px]",
      1: "-translate-y-[84px]",
    },
  },
  3: {
    parent: "hover:h-[160px]",
    childs: {
      0: "-translate-y-[42px]",
      1: "-translate-y-[84px]",
      2: "-translate-y-[126px]",
    },
  },
  4: {
    parent: "hover:h-[202px]",
    childs: {
      0: "-translate-y-[42px]",
      1: "-translate-y-[84px]",
      2: "-translate-y-[126px]",
      3: "-translate-y-[168px]",
    },
  },
  5: {
    parent: "hover:h-[244px]",
    childs: {
      0: "-translate-y-[42px]",
      1: "-translate-y-[84px]",
      2: "-translate-y-[126px]",
      3: "-translate-y-[168px]",
      4: "-translate-y-[210px]",
    },
  },
};

/*
  Support 5 of float buttons at most
*/
export const FloatButtonMore = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const childCount: number = Children.count(children);
  const { parent, childs } = COMBO[childCount];

  return (
    <div
      className={clsx(
        "group/more flex flex-col items-end gap-2 h-[34px] transition-all",
        parent,
      )}
    >
      <FloatButton id="more" Icon={EllipsisHorizontalIcon} className="z-10" />
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          className: clsx("group-hover/more:translate-y-0", childs[index]),
        }),
      )}
    </div>
  );
};

const COLOR = {
  gray: "border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-400",
  red: "border-red-300 text-red-300 hover:border-red-400 hover:text-red-400",
};

export const FloatButton = ({
  id,
  color = "gray",
  Icon,
  label,
  className,
  onClick = () => null,
}: FloatButtonType) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      id={id}
      className={clsx(
        "group/button flex justify-center items-center bg-white min-w-[34px] min-h-[34px] w-fit p-1.5 cursor-pointer rounded-3xl border transition-all",
        className,
        COLOR[color],
      )}
      onClick={handleClick}
    >
      <Icon className="stroke-2 w-3.5 h-3.5" />
      <span
        hidden={!label}
        className="text-[0px] group-hover/button:text-sm group-hover/button:ml-1 duration-300"
      >
        {label}
      </span>
    </div>
  );
};
