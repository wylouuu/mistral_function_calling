import MistralClient from "@mistralai/mistralai";
import { tools, getPaymentDate, getPaymentStatus } from "./tools.js";
import ollama from 'ollama';

const availableFunctions = {
  getPaymentDate,
  getPaymentStatus,
};

const mistralClient = new MistralClient(process.env.MISTRAL_API_KEY);

async function agent(query) {
  const messages = [
    {
      role: "user",
      content: query,
    },
  ];

    for (let i = 0; i < 5; i++) {
      const response = await mistralClient.chat({
        model: "mistral-large-latest",
        messages: messages,
        tools: tools,
      });

      messages.push(response.choices[0].message);

      if (response.choices[0].finish_reason === "stop") {
        return response.choices[0].message.content;
      } else if (response.choices[0].finish_reason === "tool_calls") {
        const functionObject = response.choices[0].message.tool_calls[0].function;
        const functionName = functionObject.name;
        const functionArgs = JSON.parse(functionObject.arguments);

        const functionResponse = await availableFunctions[functionName](functionArgs);
        messages.push({
          role: "tool",
          name: functionName,
          content: functionResponse,
        });
      }
    }
}

// const response = await agent("Is the transaction T0001 paid?");
const response = await agent("is transaction T001 have been paid?");
console.log(response);
// console.log(response);
// console.log(response.choices[0].message.tool_calls[0].function);
