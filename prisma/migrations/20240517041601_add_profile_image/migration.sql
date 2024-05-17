-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
