"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export function SearchButton() {
  return (
    <Link href={"/search"} className="group">
      <Search className="size-5 group-hover:text-primary" />
    </Link>
  );
}
