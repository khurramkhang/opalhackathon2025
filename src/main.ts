import { ToolsService } from "@optimizely-opal/opal-tools-sdk";
import cors from "cors";
import express from "express";
import basicAuth from "express-basic-auth";

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));

// Custom middleware to apply basic auth only to non-public assets
app.use((req, res, next) => {
  if (req.path.startsWith('/public/') || req.path === '/rick.gif') {
    return next(); // Skip auth for public assets
  }
  return basicAuth({
    users: { 'admin': 'password' },
    challenge: true,
  })(req, res, next);
});

// Create Tools Service
const toolsService = new ToolsService(app);

// Import tools
import "./tools/api-call";
import "./tools/greeting";
import "./tools/rick-roll";
import "./tools/sqlite-query";
import "./tools/todays-date";

// Export the Express app for serverless environments
export { app };

// Start the server only when running locally (not in serverless environments)
if (process.env.NODE_ENV !== 'production' || process.env.NETLIFY !== 'true') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
  });
}
