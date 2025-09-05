'use client'

import { useEffect } from "react";
export default function PreviewModal({ isOpen, original, suggestion, loading, onConfirm, onCancel }) {
  useEffect(()=>{
    console.log("PreiviewModal Page open");
    // console.log({ isOpen, original, suggestion, loading });
  }, [])
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black text-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">AI Suggestion</h2>

        {loading ? (
          <p className="text-gray-500">Generating suggestion...</p>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Original</p>
              <p className="p-2 border rounded bg-gray-50 text-sm">{original}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Suggestion</p>
              <p className="p-2 border rounded bg-green-50 text-sm">{suggestion}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
