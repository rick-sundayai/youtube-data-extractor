"use client"
import { useState } from "react";

export default function Home() {
  const [youtubeURL, setYoutubeURL] = useState("");

  const handleSubmit = () => {
    console.log("URL:", youtubeURL);
    // TODO: Implement the logic to send the URL to the backend
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>YouTube Transcript to JSON Tool</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="border p-2 rounded"
            value={youtubeURL}
            onChange={(e) => setYoutubeURL(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <div>Footer</div>
      </footer>
    </div>
  );
}