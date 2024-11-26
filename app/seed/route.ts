import { db } from "@vercel/postgres";
import { words } from "../lib/placeholder-data";

const client = await db.connect();

async function seedWord() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`DROP TABLE IF EXISTS words`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS words (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      class VARCHAR(255) NOT NULL,
      pronunciation VARCHAR(255) NOT NULL,
      definition VARCHAR(255) NOT NULL,
      example VARCHAR(255) NOT NULL,
      opposite VARCHAR(255) NOT NULL,
      created_by VARCHAR(255) NOT NULL,
      created_date DATE NOT NULL,
      updated_by VARCHAR(255),
      updated_date DATE
    );
  `;

  const insertedWords = await Promise.all(
    words.map(
      (word) => client.sql`
        INSERT INTO words (name, class, pronunciation, definition, example, opposite, created_by, created_date, updated_by, updated_date)
        VALUES (${word.name}, ${word.class}, ${word.pronunciation}, ${word.definition}, ${word.example}, ${word.opposite}, ${word.created_by}, ${word.created_date}, null, null)
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedWords;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedWord();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
