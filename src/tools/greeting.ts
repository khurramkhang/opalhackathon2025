import { tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";

interface GreetingParameters {
  name: string;
  language?: string;
}

async function greeting(parameters: GreetingParameters) {
  const { name, language } = parameters;

  const selectedLanguage =
    language || ["english", "spanish", "french"][Math.floor(Math.random() * 3)];

  let greeting: string;
  if (selectedLanguage.toLowerCase() === "spanish") {
    greeting = `¡Hola, ${name}! ¿Cómo estás?`;
  } else if (selectedLanguage.toLowerCase() === "french") {
    greeting = `Bonjour, ${name}! Comment ça va?`;
  } else {
    greeting = `Hello, ${name}! How are you?`;
  }

  return {
    greeting,
    language: selectedLanguage,
  };
}

tool({
  name: "greeting",
  description:
    "Greets a person in a random language (English, Spanish, or French)",
  parameters: [
    {
      name: "name",
      type: ParameterType.String,
      description: "Name of the person to greet",
      required: true,
    },
    {
      name: "language",
      type: ParameterType.String,
      description: "Language for greeting (defaults to random)",
      required: false,
    },
  ],
})(greeting);