# Migration `20200830142810-migration`

This migration has been generated by A. David Thyresson at 8/30/2020, 10:28:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "UserProfile" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"userId" TEXT NOT NULL,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE "UserRole" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"name" TEXT NOT NULL,
"userProfileId" INTEGER ,
FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "UserProfile.userId_unique" ON "UserProfile"("userId")

CREATE UNIQUE INDEX "UserRole.name_userProfileId_unique" ON "UserRole"("name","userProfileId")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200830142810-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,49 @@
+datasource DS {
+  provider = ["postgresql", "sqlite"]
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+model Post {
+  id          Int      @id @default(autoincrement())
+  createdAt   DateTime @default(now())
+  title       String
+  body        String
+  authorId    String?
+  editorId    String?
+  publisherId String?
+  publishedAt DateTime @default(now())
+  updatedAt   DateTime @default(now())
+}
+
+model Contact {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  name      String
+  email     String
+  message   String
+  userId    String?
+}
+
+model UserProfile {
+  id        Int        @id @default(autoincrement())
+  userId    String     @unique
+  createdAt DateTime   @default(now())
+  updatedAt DateTime   @default(now())
+  userRoles UserRole[]
+}
+
+model UserRole {
+  id            Int          @id @default(autoincrement())
+  createdAt     DateTime     @default(now())
+  updatedAt     DateTime     @default(now())
+  name          String
+  userProfile   UserProfile? @relation(fields: [userProfileId], references: [id])
+  userProfileId Int?
+
+  @@unique([name, userProfileId])
+}
```

