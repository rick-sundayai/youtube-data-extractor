# Project Plan: YouTube Transcript to JSON Tool

## 1. Project Setup

- Create a new Next.js project:

  npx create-next-app@latest youtube-data-extractor
  cd youtube-data-extractor

- Initialize Git repository:

  git init
  git add .
  git commit -m "first commit"
  git branch -M main
  git remote add origin https://github.com/rick-sundayai/youtube-data-extractor.git
  git push -u origin main

- Install Supabase client library:

  npm install @supabase/supabase-js

## 2. Supabase Setup

- Create a Supabase project at [https://supabase.com/](https://supabase.com/).
- Get the Supabase URL and API key.
- Create a `.env.local` file in your Next.js project and add the following from Supabase UI:

## 3. Project Structure
