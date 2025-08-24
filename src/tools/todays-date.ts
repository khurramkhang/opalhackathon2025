import { tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";

interface DateParameters {
  format?: string;
}

async function todaysDate(parameters: DateParameters) {
  const format = parameters.format || "%Y-%m-%d";

  const today = new Date();

  let formattedDate: string;
  if (format === "%Y-%m-%d") {
    formattedDate = today.toISOString().split("T")[0];
  } else if (format === "%B %d, %Y") {
    formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (format === "%d/%m/%Y") {
    formattedDate = today.toLocaleDateString("en-GB");
  } else {
    formattedDate = today.toISOString().split("T")[0];
  }

  return {
    date: formattedDate,
    format: format,
    timestamp: today.getTime() / 1000,
  };
}

tool({
  name: "todays-date",
  description: "Returns today's date in the specified format",
  parameters: [
    {
      name: "format",
      type: ParameterType.String,
      description: "Date format (defaults to ISO format)",
      required: false,
    },
  ],
})(todaysDate);