import { ChatOpenAI } from "langchain/chat_models/openai";

var token = "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"

const model = new ChatOpenAI({
    openAIApiKey: token,
    temperature: 0.9,
});

export default model;


