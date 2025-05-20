import type { z } from "zod";
import { createUpdateSchema } from "drizzle-zod";
import { students } from "@/db/schemas";

export const updateStudentSchema = createUpdateSchema(students).strict();


export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;