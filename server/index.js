// import { promptGemini } from "./Utils/gemini.js";
// import express from "express";
// const app = express();
// import { configDotenv } from "dotenv";
// import cors from 'cors';
// configDotenv();

// // Initializations
// const port = process.env.PORT;
// app.use(express.json());
// app.use(cors());

// // Routes
// import {geminiRouter} from "./Routes/GeminiRoutes.js"
// app.use("/gemini", geminiRouter)


// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// index.js
import express from 'express';
import { promptGemini } from "./Utils/gemini.js";
import { configDotenv } from "dotenv";
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Load environment variables
configDotenv();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
import { geminiRouter } from "./Routes/GeminiRoutes.js";
import { userRouter } from "./Routes/UserRoutes.js";

app.use("/gemini", geminiRouter);
app.use('/api', userRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
