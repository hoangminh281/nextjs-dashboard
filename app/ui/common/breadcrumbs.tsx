import { lusitana } from "@/app/ui/fonts";
import { BreadcrumbType } from "@/app/ui/common/lib/definitions";
import { clsx } from "clsx";
import Link from "next/link";
import Button from "./button";

const Breadcrumbs = ({
  breadcrumbs,
  submit = {
    label: "",
    onClick: () => null,
  },
  cancel = {
    href: "",
  },
}: BreadcrumbType) => {
  return (
    <div className="flex justify-between">
      <nav aria-label="Breadcrumb" className="mb-6 block">
        <ol className={clsx(lusitana.className, "flex text-xl md:text-2xl")}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.href}
              aria-current={breadcrumb.active}
              className={clsx(
                breadcrumb.active ? "text-gray-900" : "text-gray-500",
              )}
            >
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              {index < breadcrumbs.length - 1 ? (
                <span className="mx-3 inline-block">/</span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex justify-end gap-4">
        <Link
          href={cancel.href}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {cancel.label}
        </Link>
        <Button type={submit.type} onClick={submit.onClick}>
          {submit.label}
        </Button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
