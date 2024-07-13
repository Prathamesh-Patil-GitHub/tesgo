import { promptGemini } from "../Utils/gemini.js";

export const generateTestParagraph =  async (req, res) => {

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

    try{
        const promptResponse = await promptGemini(prompt);
        res.send({
            error: false,
            data: JSON.parse(promptResponse)
        });
    }
    catch(err){
        res.send({
            error: true,
            data: {
                message: "Unable to access Gemini"
            }
        })   
        console.log("Log: Generate Test Paragraph: Error - Gemini error occured")
    }

    console.log("Log: Generate Test Paragraph: Request Successful")
};

export const generateTestQuestions =  async (req, res) => {
    
    const paragraph = req.body["paragraph"];
    const no_of_questions =req.body["no_of_questions"];
    console.log(paragraph,no_of_questions);

    let prompt = `Generate an educational test of ${no_of_questions} MCQ questions with one correct answers.
    Instructions to generate the questions are as follows:
    1.The form of questions should be JSON and parsable
    2.Don't add any extra characters to the question
    3.Dont make mistakes in generating the correct answer for the MCQ Question
    4.Make sure the reponse you give should be in the format that would be parsable by a json parser
    5.Dont use 3 back ticks in response
    Use the below paragraph for generating the question: ${paragraph}`;

//     let prompt=`{
//   "paragraph": ${paragraph},  "instruction": "Generate multiple choice questions (MCQs) in JSON data object that is array of questions format based on the provided paragraph. Each question should have the following structure: {'question': 'The question itself', 'options': ['Option 1', 'Option 2', 'Option 3', 'Option 4'], 'answer': 'The correct answer'}.",
//   "num_questions": ${no_of_questions} } dont use 3 back tics and make sure json parser should be able to parse the response`
    
try{
        const promptResponse = await promptGemini(prompt);
        res.send({
            error: false,
            data:JSON.parse(promptResponse)
        });
    }
    catch(err){
        res.send({
            error: true,
            data: {
                message: "Unable to access Gemini to generate question"
            }
        })   
        console.log("Log: Generate Test Questions: Error - Gemini error occured")
    }

    console.log("Log: Generate Test Paragraph: Request Successful")
};