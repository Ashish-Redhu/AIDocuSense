import MainEditor from "./components/MainEditor";
export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 px-8 py-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Optionally add a logo/icon here */}
            <span className="inline-block w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-lg shadow-md flex items-center justify-center mr-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
              AI Doc Sense
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-base font-medium text-gray-200 italic tracking-wide">
              AI-powered document assistant
            </div>
            <div className="w-3 h-3 bg-green-500 border-2 border-white shadow-inner rounded-full animate-ping" title="AI Ready"></div>
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
