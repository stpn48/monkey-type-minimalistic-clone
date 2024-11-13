-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "statsId" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "allTimeWpm" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalTestsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalTestsStarted" INTEGER NOT NULL DEFAULT 0,
    "totalTimeTyped" INTEGER NOT NULL DEFAULT 0,
    "totalWordsTyped" INTEGER NOT NULL DEFAULT 0,
    "totalLettersTyped" INTEGER NOT NULL DEFAULT 0,
    "totalCorrectLettersTyped" INTEGER NOT NULL DEFAULT 0,
    "totalMistakes" INTEGER NOT NULL DEFAULT 0,
    "userDataId" TEXT,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "length" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserData" ADD CONSTRAINT "UserData_statsId_fkey" FOREIGN KEY ("statsId") REFERENCES "Stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
