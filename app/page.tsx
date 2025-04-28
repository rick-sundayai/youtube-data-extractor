import URLForm from "../components/URLForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="title">YouTube Transcript to JSON Tool</h1>
          <p className="description">
            Extract YouTube video transcripts and convert them to structured JSON format
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <URLForm />
          </div>
          <div className="hidden md:block">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <div className="bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}