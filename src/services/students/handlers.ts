import type { Request, Response } from "express";
import db from "@/db";
import { students } from "@/db/schemas";

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