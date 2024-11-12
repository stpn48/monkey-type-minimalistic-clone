// import prisma from "@/utils/prisma";

// const quotes = [
//   {
//     quote: "It is not the mountain we conquer but ourselves.",
//     author: "Edmund Hillary",
//     length: "medium",
//   },
//   {
//     quote: "You miss 100% of the shots you don't take.",
//     author: "Wayne Gretzky",
//     length: "medium",
//   },
//   {
//     quote: "Life isn't about finding yourself. Life is about creating yourself.",
//     author: "George Bernard Shaw",
//     length: "medium",
//   },
//   {
//     quote:
//       "The greatest glory in living lies not in never falling, but in rising every time we fall.",
//     author: "Nelson Mandela",
//     length: "long",
//   },
//   {
//     quote: "Only those who dare to fail greatly can ever achieve greatly.",
//     author: "Robert F. Kennedy",
//     length: "medium",
//   },
//   {
//     quote: "Do not wait to strike till the iron is hot; but make it hot by striking.",
//     author: "William Butler Yeats",
//     length: "medium",
//   },
//   {
//     quote: "If you want to go fast, go alone. If you want to go far, go together.",
//     author: "African Proverb",
//     length: "medium",
//   },
//   {
//     quote: "Believe you can and you're halfway there.",
//     author: "Theodore Roosevelt",
//     length: "medium",
//   },
//   {
//     quote: "Happiness is not something ready made. It comes from your own actions.",
//     author: "Dalai Lama",
//     length: "medium",
//   },
//   {
//     quote: "The only way to do great work is to love what you do.",
//     author: "Steve Jobs",
//     length: "medium",
//   },
//   {
//     quote:
//       "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
//     author: "Ralph Waldo Emerson",
//     length: "long",
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
