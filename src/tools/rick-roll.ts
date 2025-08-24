import { tool } from "@optimizely-opal/opal-tools-sdk";
import { Request } from "express";

interface ShowGifParameters {
  gifPath?: string;
  altText?: string;
}

async function showGif(
  parameters: ShowGifParameters,
  context?: { request?: Request }
) {
  
  const fullGifUrl = `https://images2.cmp.optimizely.com/Zz02MTFkOTdiODRiNDQxMWYwYTc3OTUyZGFlYjI0NjA5OQ==`;
  const markdown = `![Rick Astley](${fullGifUrl})`;

  return markdown;
}

tool({
  name: "rick-roll",
  description: "Rick rolls the user",
})(showGif);