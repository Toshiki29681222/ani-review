-- CreateTable
CREATE TABLE "public"."AnimeReview" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "animeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AnimeReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AnimeReview" ADD CONSTRAINT "AnimeReview_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "public"."Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AnimeReview" ADD CONSTRAINT "AnimeReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
