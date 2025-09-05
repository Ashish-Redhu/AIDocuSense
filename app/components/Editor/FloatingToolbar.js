'use client'

import React from "react"
export default function FloatingToolbar({ selection, onEdit, onClose }) {
  if (!selection || !selection.position || !selection.position.rect) {
    // console.log("HELLO: ", selection);
    return null;
  }


  const { rect } = selection.position;
  const style = {
    position: 'absolute',
    top: rect.top + window.scrollY - 40,
    left: rect.left + window.scrollX,
  }

  return (

    <div
      style={style}
      className="flex flex-wrap gap-2 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-xl px-3 py-2 z-50 ring-1 ring-blue-400/20"
    >
      <button
        onClick={() => onEdit('shorten')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow hover:from-blue-200 hover:to-blue-300 transition-all duration-150"
      >
        Shorten
      </button>
      <button
        onClick={() => onEdit('improve')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow hover:from-green-200 hover:to-green-300 transition-all duration-150"
      >
        Improve
      </button>
      <button
        onClick={() => onEdit('capitalize')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 shadow hover:from-purple-200 hover:to-purple-300 transition-all duration-150"
      >
        Capitalize
      </button>
      <button
        onClick={() => onEdit('lowercase')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 shadow hover:from-yellow-200 hover:to-yellow-300 transition-all duration-150"
      >
        Lowercase
      </button>
      <button
        onClick={() => onEdit('uppercase')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 shadow hover:from-pink-200 hover:to-pink-300 transition-all duration-150"
      >
        Uppercase
      </button>
      <button
        onClick={() => onEdit('reverse')}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow hover:from-gray-200 hover:to-gray-300 transition-all duration-150"
      >
        Reverse
      </button>

      <button
        onClick={onClose}
        className="text-xs px-3 py-1 rounded-lg font-semibold bg-gradient-to-r from-red-100 to-red-200 text-red-700 shadow hover:from-red-200 hover:to-red-300 transition-all duration-150"
        title="Close toolbar"
      >
        ✕
      </button>
    </div>
  )
}
