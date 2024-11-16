"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export function SearchButton({}: Props) {
  return (
    <Link href={"/search"} className="group">
      <Search className="size-5 group-hover:text-primary" />
    </Link>
  );
}
