import { RAW_CLASSES } from "@/app/lib/constants";
import { WordForm } from "@/app/lib/definitions";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(1, { message: "Please input a name" }),
  class: z.enum(RAW_CLASSES).optional(),
  pronunciation: z.string().trim().optional(),
  definition: z.string().trim().optional(),
  image: z.string().trim().optional(),
  example: z.string().trim().optional(),
  opposite: z.string().trim().optional(),
});

export const ChangeWord = FormSchema.omit({ id: true });

export type FormsType = { id: string; word: Partial<WordForm> }[];
