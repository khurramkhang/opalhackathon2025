# Deploying to Netlify

This guide walks you through deploying your Opal custom tools service to Netlify using the included configuration.

## One-Click Deploy

Deploy this project to Netlify with a single click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kunalshetye/opal-custom-tools)

## Prerequisites

- [Netlify CLI](https://docs.netlify.com/cli/get-started/) installed globally (`npm i -g netlify-cli`)
- A Netlify account
- Dependencies installed (`yarn install`)
- Node.js 18+ for local development

## Quick Deployment

This project is pre-configured for Netlify deployment with the included `netlify.toml` file and `netlify/functions/api.ts` entry point.

### 1. Install Netlify CLI

```bash
npm i -g netlify-cli
```

### 2. Login to Netlify

```bash
netlify login
```

### 3. Build and Deploy

```bash
yarn build
netlify deploy
```

For production deployment:

```bash
netlify deploy --prod
```

## Configuration Details

The project includes:

- **`netlify.toml`** - Pre-configured with build settings, external node modules, and redirects
- **`netlify/functions/api.ts`** - Netlify Function entry point using serverless-http
- **External node modules** - Express, SQLite3, and Opal SDK configured for bundling
- **Serverless wrapper** - Uses `serverless-http` to adapt Express for Netlify Functions
- **Automatic redirects** - All requests routed to the serverless function

## Alternative: Git-based Deployment

1. Connect your repository to Netlify via the web interface
2. Netlify will automatically detect the configuration from `netlify.toml`
3. Build settings are pre-configured:
   - Build command: `yarn build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`

## Environment Variables

Set environment variables in the Netlify dashboard or via CLI:

```bash
netlify env:set PORT 3000
netlify env:set YOUR_CUSTOM_ENV_VAR your_value
```

## Custom Domain

You can add a custom domain in the Netlify dashboard under your site settings.

## Considerations

- Netlify Functions have a 10-second timeout for free plans
- Cold starts may affect initial response times
- SQLite database will be read-only in serverless environment
- Static files from `public/` are served via Netlify's CDN
- External node modules are pre-configured for optimal bundling