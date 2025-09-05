import MainEditor from "./components/MainEditor";
export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Doc Sense
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              AI-powered document assistant
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="AI Ready">Hello</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <MainEditor/>
      </div>
    </main>
  );
}
