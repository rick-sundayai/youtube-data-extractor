"use server";

import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
});

export async function getVideoDetails(url: string) {
  try {
    // Extract video ID from the URL
    const videoId = new URL(url).searchParams.get("v");

    if (!videoId) {
      console.error("Invalid YouTube URL");
      return null;
    }

    const response = await youtube.videos.list({
      part: ["snippet"],
      id: [videoId],
    });

    return response.data.items;
  } catch (error) {
    console.error("Error calling YouTube API:", error);
    return null;
  }
}
