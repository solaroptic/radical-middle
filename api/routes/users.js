import express from "express";
import { deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.delete("/", deleteUser);
router.patch("/", updateUser);
export default router;
