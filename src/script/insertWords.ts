// import prisma from "@/utils/prisma";
// import { generate } from "random-words";

// async function insertWords() {
//   const randomWords: string[] = generate(1000) as string[];

//   const batchSize = 100;

//   try {
//     for (let i = 0; i < randomWords.length; i += batchSize) {
//       await prisma.wordList.createMany({
//         data: randomWords.slice(i, i + batchSize).map((word) => ({ word })),
//       });
//       console.log(`creating batch ${i / 100 + 1}...`);
//     }

//     console.log("all data created successfully ✅");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// insertWords();
