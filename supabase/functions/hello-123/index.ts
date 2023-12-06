const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

Deno.serve(async (req) => {

  const { url } = await req.json()
  const data = {
    message: `Here's the url: ${url}`,
  }
  console.log(data)

  // const url = 'https://api.openai.com/v1/chat/completions';
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': 'Bearer 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',
  //   'OpenAI-Organization': 'org-RgSCjOI2IIVQhBg1unz41kUu',
  // };

  // const body2 = {
  //   model: "gpt-4-vision-preview",
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         {
  //           type: "text",
  //           text: "Can you help me break down the menu items in the image into a JSON file that contains the following four keys - dish name, price, description, type or category. Only return the JSON in your response please"
  //         },
  //         {
  //           type: "image_url",
  //           image_url: {
  //             url: "http://www.maithainy.com/wp-content/uploads/2018/01/menu-1.jpg"
  //           }
  //         }
  //       ]
  //     }
  //   ],
  //   "max_tokens": 1000
  // };

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(body2)
  //   });

  //   if (response.ok) {

  //     function parseSpecialJson(jsonString) {
  //       // Remove the extra characters at the start and end of the string
  //       const cleanedString = jsonString.replace(/```json\n|\n```/g, '');

  //       // Parse the cleaned string as JSON
  //       try {
  //         const parsedJson = JSON.parse(cleanedString);
  //         console.log("Parsed JSON:", parsedJson);
  //         return parsedJson;
  //       } catch (e) {
  //         console.error("Parsing error:", e);
  //         return jsonString
  //       }
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     return new Response(
  //       // JSON.stringify(data),
  //       JSON.stringify(parseSpecialJson(data.choices[0].message.content)),
  //       { headers: { "Content-Type": "application/json" } },
  //     )
  //   } else {
  //     console.error('Response Error:', response.status);
  //   }
  // } catch (error) {
  //   console.error('Fetch Error:', error);
  // }

  let response = { status: "ok" }

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  })

})