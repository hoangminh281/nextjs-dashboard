"use client";

import { StateType } from "@/app/action/lib/definitions";
import { updateWord } from "@/app/action/words";
import { WordForm } from "@/app/lib/definitions";
import Button from "@/app/ui/common/button";
import Input from "@/app/ui/common/input";
import { LanguageIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ReactNode, useActionState } from "react";
import DynamicsForm from "./dynamics-form";

export default function Form({
  word,
  children: breadcrumbs,
}: {
  word: WordForm;
  children: ReactNode;
}) {
  const initialState: StateType = { message: null, errors: {} };
  const updateWordWithId = updateWord.bind(null, word.id);
  const [state, formAction] = useActionState(updateWordWithId, initialState);

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
          defaultValue={word.name}
          Icon={LanguageIcon}
          errors={state.errors?.name}
        />

        <DynamicsForm state={state} word={word} />

        <Button type="button" variant="secondary" Icon={PlusIcon}>
          Add Meaning
        </Button>
      </div>
    </form>
  );
}
