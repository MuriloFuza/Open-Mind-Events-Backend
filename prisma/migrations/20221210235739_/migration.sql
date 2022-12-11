-- DropForeignKey
ALTER TABLE "List_participants_in_Events" DROP CONSTRAINT "List_participants_in_Events_userId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_fkIdAdmin_fkey";

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_fkIdAdmin_fkey" FOREIGN KEY ("fkIdAdmin") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List_participants_in_Events" ADD CONSTRAINT "List_participants_in_Events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
