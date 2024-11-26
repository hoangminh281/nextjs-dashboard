import { fetchWordById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/common/breadcrumbs";
import Form from "@/app/ui/vocabulary/edit";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit word",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [word] = await Promise.all([fetchWordById(id)]);

  if (!word) {
    notFound();
  }

  return (
    <main>
      <Form word={word}>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Vocabulary", href: "/dashboard/vocabulary" },
            {
              label: "Edit Word",
              href: `/dashboard/vocabulary/${id}/edit`,
              active: true,
            },
          ]}
          submit={{
            label: "Edit word",
          }}
          cancel={{
            label: "Cancel",
            href: "/dashboard/vocabulary",
          }}
        />
      </Form>
    </main>
  );
}
