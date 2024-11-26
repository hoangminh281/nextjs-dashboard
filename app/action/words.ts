"use server";

import { RAW_CLASSES } from "@/app/lib/constants";
import { FormsType } from "@/app/ui/vocabulary/lib/definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { StateType } from "./lib/definitions";

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, { message: "Please input a name" }),
  class: z.enum(RAW_CLASSES),
  pronunciation: z.string().trim(),
  definition: z.string().trim(),
  image: z.string().trim(),
  example: z.string().trim(),
  opposite: z.string().trim(),
});
const CreateWord = FormSchema.omit({ id: true });

export async function createWordWithData(
  data: FormsType,
  prevState: StateType,
) {
  console.log(data);
}

export async function createWord(prevState: StateType, formData: FormData) {
  const validatedFields = CreateWord.safeParse({
    name: formData.get("name"),
    class: formData.get("class"),
    pronunciation: formData.get("pronunciation"),
    definition: formData.get("definition"),
    example: formData.get("example"),
    opposite: formData.get("opposite"),
    image: formData.get("image"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Word.",
    };
  }

  const {
    name,
    class: clazz,
    pronunciation,
    definition,
    image,
    example,
    opposite,
  } = validatedFields.data;
  const createdBy = "admin";
  const createdDate = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO words (name, class, pronunciation, definition, image, example, opposite, createdBy, createdDate)
        VALUES (${name}, ${clazz}, ${pronunciation}, ${definition}, ${image}, ${example}, ${opposite}, ${createdBy}, ${createdDate})
      `;
  } catch {
    return {
      message: "Database Error: Failed to Create Word.",
    };
  }

  revalidatePath("/dashboard/vocabulary");
  redirect("/dashboard/vocabulary");
}

// Use Zod to update the expected types
const UpdateWord = FormSchema.omit({ id: true });

export async function updateWord(
  id: string,
  prevState: StateType,
  formData: FormData,
) {
  const validatedFields = UpdateWord.safeParse({
    name: formData.get("name"),
    class: formData.get("class"),
    pronunciation: formData.get("pronunciation"),
    definition: formData.get("definition"),
    example: formData.get("example"),
    opposite: formData.get("opposite"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Word.",
    };
  }

  const {
    name,
    class: clazz,
    pronunciation,
    definition,
    example,
    opposite,
  } = validatedFields.data;
  const updatedBy = "admin";
  const updatedDate = new Date().toISOString().split("T")[0];

  try {
    await sql`
      UPDATE words
      SET name = ${name}, class = ${clazz}, pronunciation = ${pronunciation}, definition = ${definition}, example = ${example}, opposite = ${opposite}, updatedBy = ${updatedBy}, updatedDate = ${updatedDate}
      WHERE id = ${id}
    `;
  } catch {
    return { message: "Database Error: Failed to Update Word." };
  }

  revalidatePath("/dashboard/vocabulary");
  redirect("/dashboard/vocabulary");
}

export async function deleteWord(id: string) {
  try {
    await sql`DELETE FROM words WHERE id = ${id}`;
    revalidatePath("/dashboard/vocabulary");
    return { message: "Deleted Word." };
  } catch {
    return { message: "Database Error: Failed to Delete Word." };
  }
}
