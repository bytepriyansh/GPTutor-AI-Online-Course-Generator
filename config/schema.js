import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    name: varchar("name").notNull(),
    category: varchar("category").notNull(),
    includeVideo: varchar("includeVideo").notNull().default("Yes"),
    difficulty: varchar("difficulty").notNull(),
    courseOutput: json("courseOutput").notNull(),
    createdBy: varchar("createdBy").notNull(),
    userName: varchar("userName"),
    userProfileImage: varchar("userProfileImage")
});

export const Chapters = pgTable("chapters", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    chapterId: integer("chapterId").notNull(),
    content: json("content").notNull(),
    videoId: varchar("videoId").notNull()
});