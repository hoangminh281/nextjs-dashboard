import { ComponentType, ReactNode } from "react";

export type ClassBgColorType =
  | "bg-blue-500"
  | "bg-green-500"
  | "bg-purple-500"
  | "bg-yellow-500"
  | "bg-orange-500"
  | "bg-gray-500"
  | "bg-pink-500"
  | "bg-cyan-500";
export type ClassTextColorType =
  | "text-blue-500"
  | "text-green-500"
  | "text-purple-500"
  | "text-yellow-500"
  | "text-orange-500"
  | "text-gray-500"
  | "text-pink-500"
  | "text-cyan-500";
export type ClassThemeColorType =
  | "text-blue-500 bg-blue-200"
  | "text-green-500 bg-green-200"
  | "text-purple-500 bg-purple-200"
  | "text-yellow-500 bg-yellow-200"
  | "text-orange-500 bg-orange-200"
  | "text-gray-500 bg-gray-200"
  | "text-pink-500 bg-pink-200"
  | "text-cyan-500 bg-cyan-200";

export type DropdownOptionType = {
  label: string;
  value: string;
  themeColor: ClassThemeColorType;
};

export type DropdownType = {
  options?: DropdownOptionType[] | null;
  onSelect: (option: DropdownOptionType) => void;
};

export type SearchInputType = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  errors: string[] | undefined;
  values?: DropdownOptionType[];
  onEnter?: (value: string) => void;
  onSearch: (keyword: string) => void;
} & DropdownType;

export type TextareaType = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  errors: string[] | undefined;
};

export type RadioGroupType = {
  label: string;
  name: string;
  defaultValue?: string;
  options: RadioType[];
  errors: string[] | undefined;
};

export type RadioType = {
  id: string;
  name?: string;
  label: string;
  value: string;
  Icon?: ComponentType<{ className: string; hidden: boolean }>;
} & ClassPropertyType;

export type InputType = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  errors: string[] | undefined;
};

export type SearchType = { placeholder: string };

export type SelectType = {
  id: string;
  name: string;
  label: string;
  defaultValue: string;
  placeholder: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  options: {
    label: string;
    value: string;
  }[];
  errors: [];
};

export type TooltipType = {
  content: string;
  children: ReactNode;
};

export type ClassPropertyType = {
  hint: string;
  bgColor: ClassBgColorType;
  textColor?: ClassTextColorType;
  themeColor: ClassThemeColorType;
  defaultChecked?: boolean;
};

export type NavType = {
  label: string;
  href: string;
  active?: boolean;
};

export type BreadcrumbType = {
  breadcrumbs: NavType[];
  submit: {
    label: string;
    type?: "submit" | "button" | "reset";
    onClick?: () => void;
  };
  cancel: {
    label?: string;
    href: string;
  };
};

export type ImageInputType = {
  id: string;
  name: string;
  label: string;
  errors: string[] | undefined;
};

export type ButtonType = {
  variant?: "primary" | "secondary";
  Icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type FloatButtonType = {
  id: string;
  color?: "gray" | "red";
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  label?: string;
  className?: string;
  onClick?: (id: string) => void;
};
