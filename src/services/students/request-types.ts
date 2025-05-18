import type { Student } from "@/db/schemas/students"
import type { Request } from "express"

export interface UpdateStudentByIdRequest extends Request {
  params: {
    id: string
  }
  body: Partial<Student>
}