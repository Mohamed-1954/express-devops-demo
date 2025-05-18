import { Router } from "express";
import {
  getAllStudents,
  updateStudentById,
} from "./handlers";

const router = Router();

// GET all students
router.get("/", getAllStudents);

// PUT update a student by ID
router.put("/:id", updateStudentById);

export default router;