-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "allTimeWpm" DOUBLE PRECISION NOT NULL,
    "totalTestsCompleted" INTEGER NOT NULL,
    "totalTestsStarted" INTEGER NOT NULL,
    "totalTimeTyped" INTEGER NOT NULL,
    "totalWordsTyped" INTEGER NOT NULL,
    "totalLettersTyped" INTEGER NOT NULL,
    "totalCorrectLettersTyped" INTEGER NOT NULL,
    "totalMistakes" INTEGER NOT NULL,
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
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
