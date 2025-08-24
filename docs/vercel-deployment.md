# Deploying to Vercel

⚠️ **Current Status: Not Working**

This deployment is currently experiencing compatibility issues with Vercel's serverless function architecture and Express middleware, specifically with the basic authentication implementation.

## Known Issues

- **Express Middleware Compatibility**: The basic authentication middleware doesn't work properly with Vercel's serverless function runtime
- **Architecture Mismatch**: Vercel expects a more native serverless approach, while our Express app uses traditional middleware patterns
- **Build/Runtime Differences**: Unlike Netlify's `serverless-http` wrapper that preserves the full Express middleware stack, Vercel's direct app export may bypass middleware

## Prerequisites

- [Vercel CLI](https://vercel.com/cli) installed globally (`npm i -g vercel`)
- A Vercel account
- Dependencies installed (`yarn install`)
- Node.js 18+ for local development

## Quick Deployment

This project is pre-configured for Vercel deployment with the included `vercel.json` file and `vercel/index.ts` entry point.

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Build and Deploy

```bash
yarn build
vercel
```

Follow the prompts to configure your project. For subsequent deployments:

```bash
vercel --prod
```

## Configuration Details

The project includes:

- **`vercel.json`** - Pre-configured with rewrites to route all requests to the Vercel function
- **`vercel/index.ts`** - Vercel serverless function entry point
- **Automatic build detection** - Vercel will use the `yarn build` command

## Environment Variables

Set environment variables in the Vercel dashboard or via CLI:

```bash
vercel env add PORT
vercel env add YOUR_CUSTOM_ENV_VAR
```

## Custom Domain

You can add a custom domain in the Vercel dashboard under your project settings.

## Considerations

- Vercel functions have a 10-second timeout limit for Hobby plans
- Cold starts may affect initial response times
- SQLite database will be read-only in serverless environment
- Static files from `public/` are served via Vercel's CDN

## Potential Solutions (For Future Development)

### Option 1: Use serverless-http wrapper
```typescript
// vercel/index.ts
import serverless from 'serverless-http';
import { app } from '../build/main.js';

export default serverless(app);
```

### Option 2: Remove/Modify Basic Authentication
```typescript
// Disable auth for Vercel environment
const isVercel = process.env.VERCEL === '1';
if (!isVercel) {
  // Apply basic auth middleware
}
```

### Option 3: Use Vercel's Built-in Authentication
- Use Vercel's password protection feature in project settings
- Implement custom authentication that's Vercel-compatible

## Alternative: Use Netlify Instead

For immediate deployment, we recommend using [Netlify deployment](netlify-deployment.md) which works correctly with the current architecture.

## Troubleshooting (Historical)

### "No Output Directory named 'public' found" Error

This error was resolved by configuring `vercel.json` with proper build settings, but the fundamental middleware compatibility issue remains.