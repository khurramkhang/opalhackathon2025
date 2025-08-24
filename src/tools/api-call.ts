import { tool, ParameterType } from "@optimizely-opal/opal-tools-sdk";

interface ApiCallParameters {
  url: string;
  method?: string;
  headers?: string;
  body?: string;
}

async function apiCall(parameters: ApiCallParameters) {
  const { url, method = "GET", headers, body } = parameters;

  let parsedHeaders: Record<string, string> = {};
  if (headers) {
    try {
      parsedHeaders = JSON.parse(headers);
    } catch (error) {
      throw new Error(`Invalid headers JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const normalizedMethod = method.toUpperCase();
  
  if (!allowedMethods.includes(normalizedMethod)) {
    throw new Error(`Unsupported HTTP method: ${method}. Allowed methods: ${allowedMethods.join(", ")}`);
  }

  try {
    const requestOptions: RequestInit = {
      method: normalizedMethod,
      headers: {
        "Content-Type": "application/json",
        ...parsedHeaders,
      },
    };

    if (body && (normalizedMethod === "POST" || normalizedMethod === "PUT" || normalizedMethod === "PATCH")) {
      requestOptions.body = body;
    }

    const response = await fetch(url, requestOptions);
    
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    let responseBody: any;
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      try {
        responseBody = await response.json();
      } catch {
        responseBody = await response.text();
      }
    } else {
      responseBody = await response.text();
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body: responseBody,
      ok: response.ok,
      url: response.url,
    };
  } catch (error) {
    throw new Error(`API call failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

tool({
  name: "api_call",
  description: "Makes HTTP requests with support for GET, POST, PUT, PATCH, DELETE methods and custom headers",
  parameters: [
    {
      name: "url",
      type: ParameterType.String,
      description: "The URL to make the request to",
      required: true,
    },
    {
      name: "method",
      type: ParameterType.String,
      description: "HTTP method (GET, POST, PUT, PATCH, DELETE). Defaults to GET",
      required: false,
    },
    {
      name: "headers",
      type: ParameterType.String,
      description: "Custom headers as JSON string (e.g., '{\"Authorization\": \"Bearer token\"}')",
      required: false,
    },
    {
      name: "body",
      type: ParameterType.String,
      description: "Request body (for POST, PUT, PATCH methods)",
      required: false,
    },
  ],
})(apiCall);