import Breadcrumbs from "@/app/ui/common/breadcrumbs";
import Form from "@/app/ui/vocabulary/create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create word",
};

export default async function Page() {
  return (
    <main>
      <Form>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Vocabulary", href: "/dashboard/vocabulary" },
            {
              label: "Create word",
              href: "/dashboard/vocabulary/create",
              active: true,
            },
          ]}
          submit={{
            label: "Create word",
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
