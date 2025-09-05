'use client'

import { useState } from 'react'

export default function ChatSidebar({ messages, onSendMessage, loading }) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg  shadow-2xl border border-gray-700">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white self-end rounded-br-sm'
                : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 self-start rounded-bl-sm'
            }`}
          >
            <p className="text-base leading-relaxed font-medium">{msg.content}</p>
            {msg.searchResults && (
              <ul className="mt-3 list-disc list-inside text-xs text-blue-100/80">
                {msg.searchResults.map((res, j) => (
                  <li key={j}>
                    <strong>{res.title}:</strong> {res.snippet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && <p className="text-blue-300 text-sm italic animate-pulse">Thinking...</p>}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-900/70 flex gap-3 rounded-b-2xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className="flex-1 bg-gray-800/80 border border-gray-700 rounded-xl px-4 py-2 text-base text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-xl text-base font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-600 transition-all duration-150"
        >
          Send
        </button>
      </div>
    </div>
  )
}
