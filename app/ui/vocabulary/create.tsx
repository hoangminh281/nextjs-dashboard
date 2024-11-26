"use client";

import { StateType } from "@/app/action/lib/definitions";
import { createWord } from "@/app/action/words";
import { WordForm } from "@/app/lib/definitions";
import Button from "@/app/ui/common/button";
import Input from "@/app/ui/common/input";
import { LanguageIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ReactNode, useActionState, useState } from "react";
import DynamicsForm from "./dynamics-form";
import { ChangeWord } from "./lib/definitions";

export default function Form({
  children: breadcrumbs,
}: {
  children: ReactNode;
}) {
  const initialState: StateType = { message: null, errors: {} };
  const [state, formAction] = useActionState(createWord, initialState);
  const [forms, setForms] = useState<{ id: string; word: Partial<WordForm> }[]>(
    [{ id: "0", word: {} }],
  );

  const handleRemove = (removeId: string) => {
    setForms((forms) => forms.filter(({ id }) => id !== removeId));
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    const changeId = target.closest("[name=dynamics-form]")?.id;
    const name = target.name;
    const value = target.value;

    setForms((forms) => {
      const form = forms.find(({ id }) => id === changeId);

      if (!form) {
        return forms;
      }

      const validatedFields = ChangeWord.safeParse({
        ...form.word,
        [name]: value,
      });

      if (!validatedFields.success) {
        return forms;
      }

      form.word = validatedFields.data;

      return [...forms];
    });
  };

  const handleAdd = () => {
    setForms((forms) => [...forms, { id: Date.now().toString(), word: {} }]);
  };

  return (
    <form action={formAction} onChange={handleChange}>
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
          <DynamicsForm
            key={id}
            id={id}
            name="dynamics-form"
            state={state}
            onRemove={() => handleRemove(id)}
          />
        ))}

        <Button
          type="button"
          variant="secondary"
          Icon={PlusIcon}
          onClick={handleAdd}
        >
          Add Meaning
        </Button>
      </div>
    </form>
  );
}
