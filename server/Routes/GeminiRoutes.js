import express from "express";

import { generateTestParagraph } from "../Controllers/GeminiController.js";
import {generateTestQuestions} from "../Controllers/GeminiController.js"

const router = express.Router();

router.post("/generate-test-paragraph", generateTestParagraph);
router.post("/generate-test-questions", generateTestQuestions);

export {router as geminiRouter}