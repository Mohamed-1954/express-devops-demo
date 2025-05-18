import { Router } from "express";
import {
  getAllStudents,
} from "./handlers";

const router = Router();

router.get("/", getAllStudents);

export default router;