import { createUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();
router.post("/users", createUser);

export default router;
