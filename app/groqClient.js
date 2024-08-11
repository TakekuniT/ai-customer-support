// groqClient.js
import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userInput, 
      },
    ],
    model: "llama3-8b-8192",
  });
}
