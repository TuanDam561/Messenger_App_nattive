-- CreateTable
CREATE TABLE "User" (
    "UserID" TEXT NOT NULL,
    "Gmail" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Family_Name" TEXT NOT NULL,
    "Sure_Name" TEXT NOT NULL,
    "Nickname" TEXT,
    "Birthday" TIMESTAMP(3) NOT NULL,
    "HashPassword" TEXT NOT NULL,
    "Pin_OTP" INTEGER,
    "isDelete" BOOLEAN NOT NULL,
    "Role" TEXT NOT NULL,
    "IsOnline" BOOLEAN NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Gmail_key" ON "User"("Gmail");
