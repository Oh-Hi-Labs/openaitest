// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/openai' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import axios from "https://esm.sh/axios";
import { CreateCompletionRequest } from 'https://cdn.skypack.dev/openai';

serve(async (req) => {
  const { query } = await req.json()

  console.log('query', query)

  const completionConfig: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: query,
    max_tokens: 256,
    temperature: 0,
    stream: false,
  }

  // return fetch('https://api.openai.com/v1/completions', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(completionConfig),
  // })

  let result = await axios.post('https://api.openai.com/v1/completions', completionConfig, {
    headers: {
      Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
  })

  console.log('result', result)
  return result

})


// serve(async (req) => {
//   const { query } = await req.json()

//   const completionConfig: CreateCompletionRequest = {
//     model: 'text-davinci-003',
//     prompt: query,
//     max_tokens: 256,
//     temperature: 0,
//     stream: false,
//   }

//   return fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(completionConfig),
//   })
// })