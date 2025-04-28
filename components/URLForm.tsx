"use client";

import { useState } from "react";
import { getVideoDetails } from "../lib/actions";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

const URLForm = () => {
  const [url, setURL] = useState("");
  const [videoDetails, setVideoDetails] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const videoData = await getVideoDetails(url);

      if (videoData && videoData.length > 0) {
        const { id, snippet } = videoData[0];
        setVideoDetails({
          id: id,
          title: snippet?.title || "",
          description: snippet?.description || "",
          thumbnail: snippet?.thumbnails?.default?.url || "",
        });
      } else {
        setError("No video found with that URL. Please check the URL and try again.");
        setVideoDetails(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Network Error')) {
          setError("Failed to connect to the YouTube API. Please check your internet connection.");
        } else if (err.message.includes('403')) {
          setError("Access denied. Please check your API credentials.");
        } else if (err.message.includes('404')) {
          setError("Video not found. Please check the URL and try again.");
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setVideoDetails(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-lg font-medium text-gray-900 dark:text-white">
            YouTube URL:
          </label>
          <input
            type="url"
            id="url"
            className="input"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            required
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <button type="submit" className="button w-full">
          Extract Transcript
        </button>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {videoDetails && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{videoDetails.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{videoDetails.description}</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <Image
              src={videoDetails.thumbnail ?? ""}
              alt={videoDetails.title ?? ""}
              width={320}
              height={180}
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default URLForm;
