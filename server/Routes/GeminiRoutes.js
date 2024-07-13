import express from "express";

import { generateTestParagraph } from "../Controllers/GeminiController.js";

const router = express.Router();

router.post("/generate-test-paragraph", generateTestParagraph);

export {router as geminiRouter}