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
      className="w-full h-full border border-gray-300 rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-400 whitespace-pre-wrap"
    />
  )
}
