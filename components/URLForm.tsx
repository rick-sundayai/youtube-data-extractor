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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      setVideoDetails(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          YouTube URL:
        </label>
        <input
          type="url"
          id="url"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required
        />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      {videoDetails && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{videoDetails.title}</h2>
          <p className="text-gray-600">{videoDetails.description}</p>
          <Image
            src={videoDetails.thumbnail ?? ""}
            alt={videoDetails.title ?? ""}
            width={320}
            height={180}
          />
        </div>
      )}
    </div>
  );
};

export default URLForm;
