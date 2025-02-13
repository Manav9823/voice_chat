const socket = require('socket.io')
const { OpenAI } = require('openai');
require('dotenv').config();
 
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Store this in a .env file
});


const projectId = process.env.DIALOG_FLOW_PROJECT_ID
const sessionClient = new dialogflow.SessionsClient({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
});


const sendMessageToDialogflow = async (text, sessionId) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId)
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: 'en', // Change if needed
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
};

const intializeSocket = (server) => {
    console.log('intialize socket')
    const io = socket(server)
    io.on('connection', async(socket) => {
        console.log('A user connected:', socket.id);
        try{
            socket.onAny((event, ...args) => {
                console.log(`Event received: ${event}`, args);
            });
            
            socket.on('chatMessage', async({text}) => {
                console.log(text)
                try{
                    /**Chat GPT version */
                    // const response = await openai.chat.completions.create({
                    //     model: "gpt-3.5-turbo", // or "gpt-4" if available
                    //     messages: [{ role: "user", content: text }],
                    // });
    
                    // // Extract the AI's response
                    // const aiReply = response.choices[0].message.content;
                    // console.log("AI Reply:", aiReply);

                    /**DialogFlow version */
                    const sessionId = uuid.v4(); // Generate a unique session ID
                    const aiReply = await sendMessageToDialogflow(text, sessionId);
                    console.log('AI Reply:', aiReply);
                    socket.emit('chatReply', {aiReply})
                } catch(err) {
                    console.log(err)
                }
            })
        } catch(err) {
            console.log('error')
        }
    } )
}

module.exports = intializeSocket