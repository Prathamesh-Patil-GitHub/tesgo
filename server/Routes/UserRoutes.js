
import express from "express";

import { createUser } from "../Controllers/UserController.js";
const router = express.Router();

router.post('/users',createUser);

export {router as userRouter}
