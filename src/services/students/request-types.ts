import type { Request } from "express"
import type { UpdateStudentSchema } from "./validations"

export interface UpdateStudentByIdRequest extends Request {
  params: {
    id: string
  }
  body: UpdateStudentSchema
}