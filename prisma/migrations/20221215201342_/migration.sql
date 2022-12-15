-- DropForeignKey
ALTER TABLE "List_participants_in_Events" DROP CONSTRAINT "List_participants_in_Events_eventId_fkey";

-- AddForeignKey
ALTER TABLE "List_participants_in_Events" ADD CONSTRAINT "List_participants_in_Events_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
