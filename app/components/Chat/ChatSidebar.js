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
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-md ${msg.role === 'user' ? 'bg-blue-100 self-end text-black' : 'bg-gray-100 self-start text-black'}`}>
            <p className="text-sm">{msg.content}</p>
            {msg.searchResults && (
              <ul className="mt-2 list-disc list-inside text-xs text-gray-700">
                {msg.searchResults.map((res, j) => (
                  <li key={j}>
                    <strong>{res.title}:</strong> {res.snippet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && <p className="text-gray-500 text-sm">Thinking...</p>}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI..."
          className="flex-1 border rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  )
}
