import { Handler } from '@netlify/functions';
const serverless = require('serverless-http');
const { app } = require('../../build/main.js');

// Wrap the Express app with serverless-http for Netlify Functions
const handler: Handler = serverless(app);

export { handler };