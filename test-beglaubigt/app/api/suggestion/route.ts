import { NextRequest, NextResponse } from 'next/server';
import env from 'env-var';
import OpenAI from 'openai';

const API_KEY = env.get('OPENAI_API_KEY').required().asString();

const openai = new OpenAI({
  apiKey: API_KEY,
});

const validateGPTResponse = (message: string): { result: string } => {
  console.log('[DEBUG]', message);

  const split_content = message.split('json')[1];
  const clean_content = split_content.split('```')[0];

  return JSON.parse(clean_content);
};

const getSuggestionFromGPT = async (text: string, order: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are an assistant. You receive orders to make operations over a text. You response will be formatted in JSON where the post-processed text is a string that will be indexed by the key `result`',
      },
      {
        role: 'user',
        content: `Text: \"${text}\", Order: \"${order}\"`,
      },
    ],
  });

  if (!completion.choices[0].message.content) {
    throw new Error('Content should not be empty');
  }

  // Make sure the format is correct
  const payload = validateGPTResponse(completion.choices[0].message.content);

  return payload.result;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Add body validation

  const response = await getSuggestionFromGPT(body.text, body.prompt);

  return NextResponse.json({
    suggestion: response,
  });
}
