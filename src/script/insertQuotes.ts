// import prisma from "@/utils/prisma";

// const quotes = [
//   {
//     quote: "Stay hungry. Stay foolish.",
//     author: "Steve Jobs",
//     length: "short",
//   },
//   {
//     quote: "Dream big.",
//     author: "Unknown",
//     length: "short",
//   },
//   {
//     quote: "Less is more.",
//     author: "Ludwig Mies van der Rohe",
//     length: "short",
//   },
//   {
//     quote: "Seize the day.",
//     author: "Horace",
//     length: "short",
//   },
//   {
//     quote: "Do it now.",
//     author: "Unknown",
//     length: "short",
//   },
//   {
//     quote: "Keep moving forward.",
//     author: "Walt Disney",
//     length: "short",
//   },
//   {
//     quote: "Actions speak louder.",
//     author: "Proverb",
//     length: "short",
//   },
//   {
//     quote: "Think different.",
//     author: "Apple",
//     length: "short",
//   },
//   {
//     quote: "Focus and win.",
//     author: "Unknown",
//     length: "short",
//   },
//   {
//     quote: "Never give up.",
//     author: "Winston Churchill",
//     length: "short",
//   },
//   {
//     quote: "Start. Finish.",
//     author: "Unknown",
//     length: "short",
//   },
//   {
//     quote: "Believe in yourself.",
//     author: "Unknown",
//     length: "short",
//   },
//   {
//     quote: "Turn ideas into action.",
//     author: "Unknown",
//     length: "short",
//   },
// ];

// async function insertQuotes() {
//   try {
//     for (const quote of quotes) {
//       await prisma.quote.create({
//         data: {
//           quote: quote.quote,
//           author: quote.author,
//           length: quote.length,
//         },
//       });
//       console.log(`creating quote ${quote.quote}...`);
//     }

//     console.log("all data created successfully ✅");
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// insertQuotes();
