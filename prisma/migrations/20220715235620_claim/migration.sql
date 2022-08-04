/*
  Warnings:

  - Added the required column `claimId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "claimId" TEXT NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
