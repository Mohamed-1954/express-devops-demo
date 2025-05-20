import type { Request, Response } from "express";
import db from "@/db";
import type { UpdateStudentByIdRequest } from "./request-types";
import { students } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { updateStudentSchema } from "./validations";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await db.query.students.findMany()

    if (!students.length) {
      res.status(404).json({ message: "No students found in the database." });
      return;
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStudentById = async (req: UpdateStudentByIdRequest, res: Response) => {
  try {
    console.log("Request params:", req.params);

    const { error, data } = updateStudentSchema.safeParse({ studentId: req.params.id, ...req.body});
    if (error) {
      res.status(400).json({ message: "Invalid data provided.", error });
      return;
    }

    if (!data.studentId) {
      res.status(400).json({ message: "Student ID is required." });
      return;
    }
    
    const studentExists = await db.query.students.findFirst({
      where: eq(students.studentId, data.studentId),
    });

    if (!studentExists) {
      res.status(404).json({ message: "No student found in the database." });
      return;
    };

    const student = await db.update(students)
      .set(data)
      .where(eq(students.studentId, data.studentId))
      .returning();

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};