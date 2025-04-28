// app/actions/getVideoDetails.ts
"use server";

import { google } from "googleapis";

console.log("YouTube API Key:", process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? "Set" : "Not Set");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
});

interface VideoResponse {
  id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  thumbnailUrl: string | null | undefined;
  duration: string | null | undefined;
  viewCount: string | null | undefined;
  likeCount: string | null | undefined;
  commentCount: string | null | undefined;
}

export async function getVideoDetails(url: string): Promise<VideoResponse | null> {
  try {
    console.log("Processing URL:", url);
    
    // Extract video ID from the URL
    let videoId;
    try {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v");
      
      // Also handle short URLs like youtu.be/VIDEO_ID
      if (!videoId && urlObj.hostname === 'youtu.be') {
        videoId = urlObj.pathname.substring(1);
      }
    } catch (error) {
      console.error("Invalid URL format:", error);
      return null;
    }

    if (!videoId) {
      console.error("No video ID found in URL");
      return null;
    }

    console.log("Extracted video ID:", videoId);

    const response = await youtube.videos.list({
      part: ["snippet", "contentDetails", "statistics"],
      id: [videoId],
    });

    console.log("YouTube API Response:", response.data);

    if (!response.data.items || response.data.items.length === 0) {
      console.error("Video not found");
      return null;
    }

    const videoData = response.data.items[0];
    const video: VideoResponse = {
      id: videoData.id,
      title: videoData.snippet?.title || null,
      description: videoData.snippet?.description || null,
      thumbnailUrl: videoData.snippet?.thumbnails?.default?.url || null,
      duration: videoData.contentDetails?.duration || null,
      viewCount: videoData.statistics?.viewCount || null,
      likeCount: videoData.statistics?.likeCount || null,
      commentCount: videoData.statistics?.commentCount || null
    };

    return video;
  } catch (error) {
    console.error("Error calling YouTube API:", error);
    return null;
  }
}