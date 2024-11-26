import { ITEMS_PER_PAGE } from "@/app/api/lib/constants";
import { WordsTable } from "@/app/api/lib/definitions";
import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";
import { z } from "zod";

const client = await db.connect();

async function fetch(currentPage: number, query: string) {
  const offset = currentPage * ITEMS_PER_PAGE;
  const words = await client.sql<WordsTable>`
      SELECT
        words.id,
        words.name,
        words.class,
        words.pronunciation,
        words.definition,
        words.example,
        words.opposite,
        words.created_by
      FROM words
      WHERE
        ${query}::text IS NULL OR words.name ILIKE '%' || ${query}::text || '%'
      ORDER BY words.created_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

  return words.rows;
}

const FormSchema = z.object({
  currentPage: z.number(),
  query: z.string().trim(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const validatedFields = FormSchema.safeParse({
      currentPage: Number(searchParams.get("currentPage")),
      query: searchParams.get("query"),
    });

    if (!validatedFields.success) {
      return Response.json({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Search params are invalid. Failed to Get Word.",
      });
    }

    const { currentPage, query } = validatedFields.data;

    await client.sql`BEGIN`;
    const words = await fetch(currentPage, query);
    await client.sql`COMMIT`;

    return Response.json({ data: words });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
