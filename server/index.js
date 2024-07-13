import { promptGemini } from "./util/gemini.js";
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
app.post("/generate-test-paragraph", async (req, res) => {

    const paragraphTopics = req.body["paragraph-topics"];
    const containsFeedback = req.body["contains-feedback"];
    const feedback = req.body["feedback"];
    
    let prompt = `Generate an educational paragraphs of 50 lines, on the given topics.
    The paragraph should be such that we can create mcq tests from it. While generating the output make sure you generate it in the form of a JSON data where the syntax is like:  {"paragraph":"paragraph that you wrote"}. Make sure that you don't add any extra characters, the reponse you give should be in the format that would be parsable by a json parser. Make it a single paragraph with only one key value pair. Topics:`;


    paragraphTopics.map((topic)=>{
        prompt += topic +", ";
    });

    if(containsFeedback){
        prompt +=". Feedback for previous response that you gave: " + feedback;
    }

    console.log("conf feedab", containsFeedback)
    console.log(prompt)

    const promptResponse = await promptGemini(prompt);
    res.send(promptResponse);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
