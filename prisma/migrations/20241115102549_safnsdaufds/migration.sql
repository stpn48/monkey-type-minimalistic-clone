-- AlterTable
ALTER TABLE "UserData" ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "testsCompleted" INTEGER NOT NULL,
    "userDataId" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_createdAt_userDataId_key" ON "Activity"("createdAt", "userDataId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
