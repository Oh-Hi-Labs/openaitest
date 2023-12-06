const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req) => {
  try {
    const response = { message: "Hello, world!" }

    async function main() {
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('Error in API request:', response.statusText);
      return;
    }

    const completion = await response.json();
    console.log(completion.choices[0]);
  }

  main();
    
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})