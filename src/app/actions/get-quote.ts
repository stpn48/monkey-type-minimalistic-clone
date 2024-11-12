"use server";

import { QuoteLength } from "@/context/use-config-state";
import prisma from "@/utils/prisma";

export async function getQuote(length: QuoteLength) {
  // TODO: Add more security
  try {
    const quotes = await prisma.quote.findMany({
      where: {
        length: length,
      },
    });

    // choose random quote
    console.log("Quotes successfully fetched");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  } catch (error) {
    console.error(error);
  }
}
