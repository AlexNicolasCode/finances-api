-- CreateTable
CREATE TABLE "MonthlyFinance" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "currentMoney" DOUBLE PRECISION NOT NULL,
    "outgoing" DOUBLE PRECISION NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MonthlyFinance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserL" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "UserL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserL_email_key" ON "UserL"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserL_email_password_key" ON "UserL"("email", "password");

-- AddForeignKey
ALTER TABLE "MonthlyFinance" ADD CONSTRAINT "MonthlyFinance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserL"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
