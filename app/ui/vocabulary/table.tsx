import { fetchFilteredWords } from "@/app/lib/data";
import { DeleteWord, UpdateWord } from "@/app/ui/vocabulary/buttons";

export default async function WordsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const words = await fetchFilteredWords(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {words?.map((word) => (
              <div
                key={word.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{word.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{word.class}</p>
                  </div>
                  {word.pronunciation}
                </div>
                <div className="w-full pt-4">
                  <p className="text-xl font-medium">{word.definition}</p>
                </div>
                <div className="w-full pt-2">
                  <p className="whitespace-pre text-ellipsis overflow-x-hidden">
                    {word.example}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between pt-2">
                  <p className="text-sm">{word.opposite}</p>
                  <div className="flex justify-end gap-2">
                    <UpdateWord id={word.id} />
                    <DeleteWord id={word.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Class
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Pronunciation
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Definition
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Example
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Opposite
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created by
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {words?.map((word) => (
                <tr
                  key={word.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-pre py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{word.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{word.class}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {word.pronunciation}
                  </td>
                  <td className="whitespace-pre px-3 py-3">
                    {word.definition}
                  </td>
                  <td className="whitespace-pre-line px-3 py-3">
                    {word.example}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {word.opposite}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {word.created_by}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateWord id={word.id} />
                      <DeleteWord id={word.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
