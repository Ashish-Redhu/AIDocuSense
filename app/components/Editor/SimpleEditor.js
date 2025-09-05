'use client'

import { useRef, useEffect } from 'react'

export default function SimpleEditor({ content, onChange, onSelect }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.textContent !== content) {
      editorRef.current.textContent = content
    }
  }, [content])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.textContent)
    }
  }

  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim().length > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      onSelect(selection.toString(), { range, rect })
    } else {
      onSelect(null)
    }
  }

  return (
    <div
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onMouseUp={handleMouseUp}
      className="w-full h-full min-h-[200px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border border-gray-700 shadow-2xl rounded-2xl p-6 outline-none focus:ring-4 focus:ring-blue-500/40 whitespace-pre-wrap text-lg font-medium text-gray-100 transition-all duration-200"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)'
      }}
    />
  )
}
