export type WordsTable = {
  id: string;
  name: string;
  class:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "prepositions"
    | "conjunctions"
    | "interjections";
  pronunciation: string;
  definition: string;
  example: string;
  opposite: string;
  created_by: string;
  created_date: string;
};
