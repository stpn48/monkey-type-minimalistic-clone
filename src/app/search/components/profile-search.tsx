"use client";

import { getSuggestions } from "@/app/actions/get-suggestions";
import { Input } from "@/components/input";
import { LoaderPinwheel, Search } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useEffect, useState, useTransition } from "react";

type Props = {};

export function ProfileSearch({}: Props) {
  const [query, setQuery] = useQueryState("query");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getSuggestionsAsync(query: string | null) {
      if (!query) return;
      setIsLoading(true);
      const suggestions = await getSuggestions(query);

      setIsLoading(false);

      if (suggestions.length === 0) {
        setSuggestions([]);
        return;
      }

      setSuggestions(suggestions.map((suggestion) => suggestion.username));
    }

    getSuggestionsAsync(query);
  }, [query]);

  return (
    <div className="relative flex flex-col">
      <form className="flex">
        <Input
          className={`${query ? "rounded-b-none rounded-t-lg rounded-tr-none" : "rounded-lg rounded-r-none"} w-full`}
          defaultValue={query || ""}
          placeholder="Search for a username"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={`rounded-tr-lg bg-foreground px-4 ${query ? "rounded-tr-lg" : "rounded-r-lg"}`}
        >
          <Search className="size-5" />
        </button>
      </form>

      {/* search suggestions */}
      {query && (
        <div className="absolute top-full z-10 flex w-full flex-col gap-2 rounded-b-lg bg-foreground p-4">
          {isLoading && (
            <div className="flex w-full justify-center">
              <LoaderPinwheel className="animate-spin" />
            </div>
          )}

          {!isLoading && suggestions.length === 0 && <p>No users found.</p>}

          {!isLoading &&
            suggestions.length > 0 &&
            suggestions.map((suggestion) => {
              return (
                <Link
                  href={`/profile/${suggestion}`}
                  key={suggestion}
                  className="rounded-md bg-foreground px-4 py-1 text-start hover:bg-background"
                >
                  {suggestion}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
