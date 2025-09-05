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
      className="flex flex-wrap gap-2 bg-white border text-black border-gray-300 shadow-lg rounded-md px-2 py-1 z-50"
    >
      <button
        onClick={() => onEdit('shorten')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Shorten
      </button>
      <button
        onClick={() => onEdit('improve')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Improve
      </button>
      <button
        onClick={() => onEdit('capitalize')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Capitalize
      </button>
      <button
        onClick={() => onEdit('lowercase')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Lowercase
      </button>
      <button
        onClick={() => onEdit('uppercase')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Uppercase
      </button>
      <button
        onClick={() => onEdit('reverse')}
        className="text-xs px-2 py-1 rounded hover:bg-gray-200"
      >
        Reverse
      </button>

      <button
        onClick={onClose}
        className="text-xs px-2 py-1 rounded hover:bg-red-200 text-red-600"
      >
        ✕
      </button>
    </div>
  )
}
