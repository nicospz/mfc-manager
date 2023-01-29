-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ordered', 'Owned', 'Wished');

-- CreateTable
CREATE TABLE "Figure" (
    "id" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "shop" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);
