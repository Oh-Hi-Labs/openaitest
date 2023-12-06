import { serve, ServerRequest, Response } from "https://deno.land/std/http/server.ts";
import { create, ChatCompletion } from "https://cdn.skypack.dev/openai";
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');


const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const server = serve({ port: 8000 });

async function main() {
  const response = await create({
    apiKey: OPENAI_API_KEY,
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
            },
          },
        ],
      },
    ],
  }) as ChatCompletion;
  console.log(response.choices[0]);
}

for await (const req of server) {
  const resp = await req.json();
  const data = {
    message: `Hello ${resp.message}!`,
  };

  main();

  req.respond({
    body: JSON.stringify(data),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
}

import { serve, ServerRequest, Response } from "https://deno.land/std/http/server.ts";
import { create, ChatCompletion } from "https://cdn.skypack.dev/openai";
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req) => {
  const resp = await req.json()
  const data = {
    message: `Hello ${resp.message}!`,
  }

  async function main() {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What’s in this image?" },
            {
              type: "image_url",
              image_url: {
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            },
          ],
        },
      ],
    });
    console.log(response.choices[0]);
  }
  main();

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/vision' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
