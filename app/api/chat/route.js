import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import dotenv from 'dotenv';

dotenv.config();

const systemPrompt = "You are an AI customer support, but you respond with a vegetable analogy"

export async function POST(req){
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.json();

    const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: systemPrompt,
          },
          ...data,
        ],
        model: "llama3-8b-8192",
        stream: true,
      });
    
      const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder;
            try {
                for await (const chunk of completion){
                    const content = chunk.choices[0].delta.content;
                    if (content){
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
      });
      return new NextResponse(stream);
}