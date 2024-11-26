import { fetchWordPages } from "@/app/lib/data";
import Search from "@/app/ui/common/search";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { CreateWord } from "@/app/ui/vocabulary/buttons";
import Pagination from "@/app/ui/vocabulary/pagination";
import Table from "@/app/ui/vocabulary/table";
import clsx from "clsx";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vocabulary",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchWordPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={clsx(lusitana.className, "text-2xl")}>Vocabulary</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search word..." />
        <CreateWord />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
