import { StateErrorType, StateType } from "@/app/action/lib/definitions";
import { WordForm, WordsTable } from "@/app/lib/definitions";
import useBool from "@/app/lib/hook/useBool";
import useFetch from "@/app/lib/hook/useFetch";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookOpenIcon,
  PhotoIcon,
  SpeakerWaveIcon,
  SwatchIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import ImageInput from "../common/image-input";
import Input from "../common/input";
import { DropdownOptionType } from "../common/lib/definitions";
import RadioGroup from "../common/radio-group";
import SearchInput from "../common/search-input";
import Textarea from "../common/textarea";
import { CLASS_OPTIONS, CLASS_PROPERTY } from "./lib/constants";

const ExpandButton = ({
  hidden,
  isExpand,
  toggle,
}: {
  hidden?: boolean;
  isExpand: boolean;
  toggle: () => void;
}) => {
  return (
    <div
      hidden={hidden}
      className="absolute top-0 left-0 right-0 h-full px-3 py-4"
    >
      <div
        className="group sticky top-0 left-full flex items-center w-fit bg-white px-1.5 py-1.5 cursor-pointer rounded-3xl border border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-400 animate-bounce z-10"
        onClick={toggle}
      >
        <ArrowUpIcon
          className={clsx("stroke-2 transition-all", {
            "w-3.5 h-3.5": isExpand,
            "w-0 h-0": !isExpand,
          })}
        />
        <ArrowDownIcon
          className={clsx("stroke-2 transition-all", {
            "w-3.5 h-3.5": !isExpand,
            "w-0 h-0": isExpand,
          })}
        />
        <span className="text-[0px] group-hover:text-sm group-hover:ml-1 duration-300">
          {isExpand ? "Collapse" : "Expand"}
        </span>
      </div>
    </div>
  );
};

const CompactForm = ({
  isToggle,
  word,
}: {
  isToggle: boolean;
  word?: WordForm;
}) => {
  return (
    <div
      className={clsx("flex gap-3 items-center transition-all", {
        "opacity-100": isToggle,
        "opacity-0 h-0 overflow-hidden": !isToggle,
      })}
    >
      {word?.image ? (
        <Image
          className="w-24 h-24"
          src={word.image}
          alt={`Image of ${word?.name}`}
        />
      ) : (
        <PhotoIcon className="w-24 h-24 text-gray-300" />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{word?.name}</h1>
        <p
          hidden={!word?.class}
          className={clsx(
            "text-sm",
            word && CLASS_PROPERTY[word.class].textColor,
          )}
        >
          {word?.class}
        </p>
        <p hidden={!word?.pronunciation} className="text-sm text-gray-500">
          {word?.pronunciation}
        </p>
        <p hidden={!word?.definition} className="text-sm">
          {word?.definition}
        </p>
      </div>
    </div>
  );
};

const DetailForm = ({
  isToggle,
  errors,
  word,
}: {
  isToggle: boolean;
  errors?: StateErrorType;
  word?: WordForm;
}) => {
  const [opposite, setOpposite] = useState<{
    options?: DropdownOptionType[] | null;
    values: DropdownOptionType[];
  }>({
    values: word
      ? [
          {
            label: word.name,
            value: word.id,
            themeColor: CLASS_PROPERTY[word.class].themeColor,
          },
        ]
      : [],
  });
  const [fetchWords] = useFetch<WordsTable[]>(
    "GET",
    "http://localhost:3000/api/word",
  );

  const handleSearchOpposite = async (query: string) => {
    setOpposite((opposite) => ({
      ...opposite,
      options: null,
    }));

    const words = await fetchWords({ params: { query, currentPage: 0 } });

    setOpposite((opposite) => ({
      ...opposite,
      options: words.map(({ id, name, class: clazz }) => ({
        label: name,
        value: id,
        themeColor: CLASS_PROPERTY[clazz].themeColor,
      })),
    }));
  };

  return (
    <div
      className={clsx("w-full transition-all", {
        "opacity-100": isToggle,
        "opacity-0 h-0 overflow-hidden": !isToggle,
      })}
    >
      {/* Word Class */}
      <RadioGroup
        label="Choose the word's class"
        name="class"
        defaultValue={word?.class}
        options={CLASS_OPTIONS}
        errors={errors?.class}
      />

      {/* Word Pronunciation */}
      <Input
        id="pronunciation"
        name="pronunciation"
        label="Input word's pronunciation"
        placeholder="Enter word's pronunciation"
        defaultValue={word?.pronunciation}
        Icon={SpeakerWaveIcon}
        errors={errors?.pronunciation}
      />

      {/* Word Definition */}
      <Textarea
        id="definition"
        name="definition"
        label="Input word's definition"
        placeholder="Enter word's definition"
        defaultValue={word?.definition}
        Icon={BookOpenIcon}
        errors={errors?.definition}
      />

      <ImageInput
        id="image"
        name="image"
        label="Upload word's image"
        errors={errors?.image}
      />

      {/* Word Example */}
      <Textarea
        id="example"
        name="example"
        label="Input word's example"
        placeholder="Enter word's example"
        defaultValue={word?.example}
        Icon={SwatchIcon}
        errors={errors?.example}
      />

      {/* Word Opposite */}
      <SearchInput
        id="opposite"
        name="opposite"
        label="Input word's opposite"
        placeholder="Enter word's opposite"
        Icon={XCircleIcon}
        errors={errors?.opposite}
        values={opposite.values}
        options={opposite.options}
        // onEnter={() => {}}
        onSearch={handleSearchOpposite}
        onSelect={(option) =>
          setOpposite((opposite) => ({
            ...opposite,
            values: [...opposite.values, option],
          }))
        }
      />
    </div>
  );
};

const DynamicsForm = ({
  state,
  word,
}: {
  state: StateType;
  word?: WordForm;
}) => {
  const [isExpand, , , toggle] = useBool(true);

  return (
    <fieldset className="relative p-4 rounded-md bg-white shadow-sm transition-all mb-4">
      <ExpandButton isExpand={isExpand} toggle={toggle} />
      <CompactForm isToggle={!isExpand} word={word} />
      <DetailForm isToggle={isExpand} errors={state.errors} word={word} />

      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </fieldset>
  );
};

export default DynamicsForm;
