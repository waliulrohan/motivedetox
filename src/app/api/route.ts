import model from "@/lib/gemini";

async function run() {
  const prompt = "write a song in bengali"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
}

export async function GET(request:Request) {

  
 const aiResponse = await run();
  
    return new Response(JSON.stringify({ message: aiResponse }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }