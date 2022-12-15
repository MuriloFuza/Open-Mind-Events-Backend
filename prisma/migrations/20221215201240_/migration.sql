-- DropForeignKey
ALTER TABLE "activity" DROP CONSTRAINT "activity_fkEventId_fkey";

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_fkEventId_fkey" FOREIGN KEY ("fkEventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
