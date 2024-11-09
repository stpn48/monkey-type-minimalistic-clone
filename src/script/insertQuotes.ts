// import prisma from "@/utils/prisma";

// const quotes = [
//   {
//     quote: "The only limit to our realization of tomorrow is our doubts of today.",
//     author: "Franklin D. Roosevelt",
//     length: "medium",
//   },
//   {
//     quote:
//       "In the end, we will remember not the words of our enemies, but the silence of our friends.",
//     author: "Martin Luther King Jr.",
//     length: "medium",
//   },
//   {
//     quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//     author: "Winston Churchill",
//     length: "medium",
//   },
//   {
//     quote:
//       "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
//     author: "Ralph Waldo Emerson",
//     length: "long",
//   },
//   {
//     quote:
//       "The greatest glory in living lies not in never falling, but in rising every time we fall.",
//     author: "Nelson Mandela",
//     length: "medium",
//   },
//   {
//     quote: "Life is what happens when you're busy making other plans.",
//     author: "John Lennon",
//     length: "short",
//   },
//   {
//     quote: "The purpose of our lives is to be happy.",
//     author: "Dalai Lama",
//     length: "short",
//   },
//   {
//     quote: "It is our choices that show what we truly are, far more than our abilities.",
//     author: "J.K. Rowling",
//     length: "medium",
//   },
//   {
//     quote:
//       "Do not go where the path may lead, go instead where there is no path and leave a trail.",
//     author: "Ralph Waldo Emerson",
//     length: "medium",
//   },
//   {
//     quote: "The journey of a thousand miles begins with one step.",
//     author: "Lao Tzu",
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
