"use client";

import { StateType } from "@/app/action/lib/definitions";
import { createWord } from "@/app/action/words";
import Button from "@/app/ui/common/button";
import Input from "@/app/ui/common/input";
import { LanguageIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ReactNode, useActionState, useState } from "react";
import DynamicsForm from "./dynamics-form";

export default function Form({
  children: breadcrumbs,
}: {
  children: ReactNode;
}) {
  const initialState: StateType = { message: null, errors: {} };
  const [state, formAction] = useActionState(createWord, initialState);
  const [forms, setForms] = useState([{ id: 0 }]);

  return (
    <form action={formAction}>
      {breadcrumbs}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Word Name */}
        <Input
          id="name"
          name="name"
          label="Input word's name"
          placeholder="Enter word's name"
          Icon={LanguageIcon}
          errors={state.errors?.name}
        />

        {forms.map(({ id }) => (
          <DynamicsForm key={id} state={state} />
        ))}

        <Button
          type="button"
          variant="secondary"
          Icon={PlusIcon}
          onClick={() => setForms((forms) => [...forms, { id: Date.now() }])}
        >
          Add Meaning
        </Button>
      </div>
    </form>
  );
}
