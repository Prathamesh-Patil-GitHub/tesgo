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