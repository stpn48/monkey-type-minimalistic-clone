"use client";

import { getSuggestions } from "@/app/actions/get-suggestions";
import { Input } from "@/components/input";
import { LoaderPinwheel } from "lucide-react";
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
    <div className="relative flex flex-col gap-4">
      <form className="flex gap-2">
        <Input
          defaultValue={query || ""}
          placeholder="Search for a username"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>SEARCH</button>
      </form>

      {/* search suggestions */}
      {query && (
        <div className="absolute top-full mt-2 flex w-full flex-col gap-2 rounded-lg bg-foreground p-4">
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
