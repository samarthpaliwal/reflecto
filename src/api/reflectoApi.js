import axios from 'axios'

const API_URL = 'http://localhost:11434/api/generate' // Replace if hosted elsewhere

export const getReflection = async (entryText) => {
  const systemPrompt = `
You are a CBT journaling assistant. Do not give advice. Do not act as a therapist.
Gently ask thoughtful, therapeutic questions based on Cognitive Behavioral Therapy.
NEVER give diagnoses. If user mentions self-harm, encourage them to seek immediate professional help.

User entry:
"${entryText}"

Now reply with 2-3 thoughtful CBT-style questions that guide the user to reflect and reframe.
`;

  const payload = {
    model: "mistral:instruct", // or "llama2-70b-chat", etc. depending on your setup
    prompt: systemPrompt,
    stream: false
  };

  const response = await axios.post(API_URL, payload);
  return response.data.response || '';
}
