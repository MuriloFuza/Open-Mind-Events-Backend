-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "university" TEXT,
    "key" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "init_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "speaker_name" TEXT,
    "eventId" TEXT,
    "fkEventId" TEXT NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "init_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "banner_url" TEXT DEFAULT 'https://i.imgur.com/ZH5Bmpv.jpg',
    "fkIdAdmin" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List_participants_in_Events" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "List_participants_in_Events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_key_key" ON "user"("key");

-- CreateIndex
CREATE UNIQUE INDEX "event_name_key" ON "event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "event_fkIdAdmin_key" ON "event"("fkIdAdmin");

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_fkEventId_fkey" FOREIGN KEY ("fkEventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_fkIdAdmin_fkey" FOREIGN KEY ("fkIdAdmin") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List_participants_in_Events" ADD CONSTRAINT "List_participants_in_Events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List_participants_in_Events" ADD CONSTRAINT "List_participants_in_Events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
