
import express from "express";

import { createUser } from "../Controllers/UserController.js";
const router = express.Router();

router.post('/signup', createUser);

export {router as userRouter}
