import express from 'express';
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
app.use('/auth', userRouter);

// Connect to MongoDB
mongoose.connect('mongodb://prathamesh:prathamesh@ac-rovb9yg-shard-00-00.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-01.9fh8spg.mongodb.net:27017,ac-rovb9yg-shard-00-02.9fh8spg.mongodb.net:27017/tesgo?ssl=true&replicaSet=atlas-w4n73x-shard-0&authSource=admin&retryWrites=true&w=majority')
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
