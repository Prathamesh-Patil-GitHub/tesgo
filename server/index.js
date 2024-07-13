import { promptGemini } from "./Utils/gemini.js";
import express from "express";
const app = express();
import { configDotenv } from "dotenv";
import cors from 'cors';
configDotenv();

// Initializations
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// Routes
import {geminiRouter} from "./Routes/GeminiRoutes.js"
app.use("/gemini", geminiRouter)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
