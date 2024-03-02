-- CreateEnum
CREATE TYPE "property_type" AS ENUM ('apartment', 'house', 'townhouse', 'condo', 'basement', 'studio', 'loft', 'duplex', 'triplex', 'penthouse', 'laneway', 'dorm', 'other');

-- CreateEnum
CREATE TYPE "ad_source" AS ENUM ('vanpeople', 'vansky', 'craigslist', 'pulrent', 'other');

-- CreateEnum
CREATE TYPE "rental_form" AS ENUM ('month_to_month', 'fixed_term', 'short_term', 'long_term', 'room_rental', 'student_housing', 'shared_living', 'sublet', 'other');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "property" (
    "property_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "landlord_id" TEXT,
    "property_type" "property_type" NOT NULL,
    "ad_source" "ad_source" NOT NULL,
    "original_url" TEXT,
    "title" TEXT,
    "time_posted" TIMESTAMPTZ(6),
    "time_updated" TIMESTAMPTZ(6),
    "bathroom" DOUBLE PRECISION,
    "bedroom" INTEGER,
    "price" INTEGER,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "original_description" TEXT,
    "parking" SMALLINT DEFAULT 0,
    "is_furnished" BOOLEAN,
    "rental_form" "rental_form" NOT NULL,
    "availability_date" DATE,
    "contact_name" TEXT,
    "preferred_languages" TEXT[],
    "email" TEXT,
    "we_chat" TEXT,
    "phone_number" TEXT,
    "lease_terms" INTEGER,
    "pet_allowed" BOOLEAN,
    "source_id" TEXT NOT NULL,
    "water" BOOLEAN,
    "hydro" BOOLEAN,
    "heat" BOOLEAN,
    "internet" BOOLEAN,
    "air_conditioning" BOOLEAN,
    "gym" BOOLEAN,
    "pool" BOOLEAN,
    "dishwasher" BOOLEAN,
    "EV_charging" BOOLEAN,
    "storage" BOOLEAN,
    "balcony" BOOLEAN,
    "in_suite_laundry" BOOLEAN,

    CONSTRAINT "property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "language" (
    "language_id" SERIAL NOT NULL,
    "language_name" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "property_translation" (
    "property_id" UUID NOT NULL,
    "language_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "property_translation_pkey" PRIMARY KEY ("property_id","language_id")
);

-- CreateTable
CREATE TABLE "geography" (
    "language_id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "translated_city" TEXT NOT NULL,
    "translated_state" TEXT NOT NULL,
    "translated_country" TEXT NOT NULL,

    CONSTRAINT "geography_pkey" PRIMARY KEY ("language_id","city","state","country")
);

-- CreateTable
CREATE TABLE "property_geolocation" (
    "property_id" UUID NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "original_address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT,
    "confidence" INTEGER,

    CONSTRAINT "property_geolocation_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "liked_property" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liked_property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "property_property_id_key" ON "property"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_source_id_key" ON "property"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_geolocation_property_id_key" ON "property_geolocation"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "liked_property_user_id_property_id_key" ON "liked_property"("user_id", "property_id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_landlord_id_fkey" FOREIGN KEY ("landlord_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_translation" ADD CONSTRAINT "property_translation_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_translation" ADD CONSTRAINT "property_translation_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geography" ADD CONSTRAINT "geography_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_geolocation" ADD CONSTRAINT "property_geolocation_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_property" ADD CONSTRAINT "liked_property_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_property" ADD CONSTRAINT "liked_property_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("property_id") ON DELETE CASCADE ON UPDATE CASCADE;
