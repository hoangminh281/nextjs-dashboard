import { CLASSES } from "@/app/lib/constants";
import { ClassPropertyType, RadioType } from "../../common/lib/definitions";

export const CLASS_PROPERTY: { [key: string]: ClassPropertyType } = {
  noun: {
    hint: "In grammar, a noun is a word that represents a concrete or abstract thing, such as living creatures, places, actions, qualities, states of existence, and ideas. A noun may serve as an object or subject within a phrase, clause, or sentence.",
    bgColor: "bg-blue-500",
    textColor: "text-blue-500",
    themeColor: "text-blue-500 bg-blue-200",
  },
  verb: {
    hint: "A verb is part of speech that in syntax generally conveys an action, an occurrence, or a state of being. In the usual description of English, the basic form, with or without the particle to, is the infinitive. In many languages, verbs are inflected to encode tense, aspect, mood, and voice.",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    themeColor: "text-green-500 bg-green-200",
  },
  adjective: {
    hint: "An adjective is a word that describes or defines a noun or noun phrase. Its semantic role is to change information given by the noun. Traditionally, adjectives are considered one of the main parts of speech of the English language, although historically they were classed together with nouns.",
    bgColor: "bg-purple-500",
    textColor: "text-purple-500",
    themeColor: "text-purple-500 bg-purple-200",
  },
  adverb: {
    hint: "An adverb is a word or an expression that generally modifies a verb, an adjective, another adverb, a determiner, a clause, a preposition, or a sentence. Adverbs typically express manner, place, time, frequency, degree, or level of certainty by answering questions such as how, in what way, when, where, to what extent.",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    themeColor: "text-yellow-500 bg-yellow-200",
  },
  pronoun: {
    hint: "In linguistics and grammar, a pronoun is a word or a group of words that one may substitute for a noun or noun phrase.",
    bgColor: "bg-orange-500",
    textColor: "text-orange-500",
    themeColor: "text-orange-500 bg-orange-200",
  },
  prepositions: {
    hint: "A preposition is a word or group of words that appears before a noun, pronoun, or noun phrase to show the relationship between the words in a sentence. Prepositions can indicate direction, time, place, location, spatial relationships, or introduce an object.",
    bgColor: "bg-gray-500",
    textColor: "text-gray-500",
    themeColor: "text-gray-500 bg-gray-200",
  },
  conjunctions: {
    hint: "Conjunctions are parts of speech that connect words, phrases, clauses, or sentences. There are three kinds of conjunctions: coordinating, paired, and subordinating. For more information about conjunctions, also see these webpages: Compound Sentences, Varying Sentence Structure, and.",
    bgColor: "bg-pink-500",
    textColor: "text-pink-500",
    themeColor: "text-pink-500 bg-pink-200",
  },
  interjections: {
    hint: "An interjection is a word or expression that occurs as an utterance on its own and expresses a spontaneous feeling or reaction.[1][2] It is a diverse category, encompassing many different parts of speech, such as exclamations (ouch!, wow!), curses (damn!), greetings (hey, bye), response particles (okay, oh!, m-hm, huh?), hesitation markers (uh, er, um), and other words (stop, cool).",
    bgColor: "bg-cyan-500",
    textColor: "text-cyan-500",
    themeColor: "text-cyan-500 bg-cyan-200",
  },
};

export const CLASS_OPTIONS: RadioType[] = CLASSES.map(({ label, value }) => ({
  id: value,
  label,
  value,
  hint: CLASS_PROPERTY[value].hint,
  bgColor: CLASS_PROPERTY[value].bgColor,
  themeColor: CLASS_PROPERTY[value].themeColor,
}));
