"use server";

import prisma from "@/utils/prisma";

export async function getSuggestions(query: string) {
  if (!query) return []; // Handle empty query gracefully

  const sanitizedQuery = query.trim().toLowerCase(); // Clean input

  console.log("sanitizedQuery", sanitizedQuery);

  const suggestions = await prisma.userData.findMany({
    where: {
      username: {
        contains: sanitizedQuery,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  return suggestions;
}
