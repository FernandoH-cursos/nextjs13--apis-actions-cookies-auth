-- CreateTable
CREATE TABLE "public"."Employee" (
    "Id" SERIAL NOT NULL,
    "name" VARCHAR,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6),
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("Id")
);
