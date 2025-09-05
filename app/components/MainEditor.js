"use client";

import { useState } from 'react'
 
import { jsPDF } from 'jspdf'
import { Document, Packer, Paragraph, TextRun } from 'docx'
 
import SimpleEditor from './Editor/SimpleEditor'
import ChatSidebar from './Chat/ChatSidebar'
import FloatingToolbar from './Editor/FloatingToolbar'
import PreviewModal from './Editor/PreviewModal'

export default function MainEditor() {
    // Editor state
    const [editorContent, setEditorContent] = useState('Start typing here...\n\nSelect any text to see AI editing options!');
    // Selection state
    const [selection, setSelection] = useState(null);

    // Modal state for previewing AI suggestions
    const [modal, setModal] = useState({ isOpen: false, original: '', suggestion: '', loading: false, range: null });
    // Chat state
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: 'Hello! How can I assist you with your document today?' }
    ]);
    const [chatLoading, setChatLoading] = useState(false);

    // State for download button hover
    const [showDownload, setShowDownload] = useState(false);

    // Handle text selection
    const handleSelection = (selectedText, position) =>{
        setSelection({ text: selectedText, position });
    }

    // -------------
    // Handle AI edit request
    const handleEditRequest = async (type) => {
  if (!selection) return;

  setModal({
    isOpen: true,
    original: selection.text,
    suggestion: '',
    loading: true,
    range: selection.position.range
  });

  try {
    let suggestion = selection.text;

    switch (type) {
      case 'shorten':
        suggestion = selection.text.split(' ')
          .slice(0, Math.max(3, Math.floor(selection.text.split(' ').length / 2)))
          .join(' ') + '...';
        break;

      case 'improve':
        suggestion = selection.text.charAt(0).toUpperCase() +
          selection.text.slice(1).replace(/\./g, '!').replace(/\bawesome\b/gi, 'incredible');
        break;

      case 'capitalize':
        suggestion = selection.text.replace(/\b\w/g, l => l.toUpperCase());
        break;

      case 'lowercase':
        suggestion = selection.text.toLowerCase();
        break;

      case 'uppercase':
        suggestion = selection.text.toUpperCase();
        break;

      case 'reverse':
        suggestion = selection.text.split('').reverse().join('');
        break;

      default:
        suggestion = selection.text;
    }

    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay

    setModal(prev => ({ ...prev, suggestion, loading: false }));
  } catch (error) {
    console.error("Local edit failed:", error);
    setModal(prev => ({ ...prev, loading: false }));
  }
};
    // --------------

    // Handle modal confirm
    const handleModalConfirm = () =>{
        if(modal.range && modal.suggestion){
            // Replace selected text with suggestion
            const range = modal.range;
            range.deleteContents();
            range.insertNode(document.createTextNode(modal.suggestion));

            // Update editor content
            const editorElement = document.querySelector('[contenteditable]')
            if(editorElement){
                setEditorContent(editorElement.textContent);
            }
        }
        setModal({ isOpen: false, original: '', suggestion: '', loading: false, range: null })
        setSelection(null)
    }

    // Handle modal cancel
    const handleModalCancel = () => {
        setModal({ isOpen: false, original: '', suggestion: '', loading: false, range: null })
    }


    // Handle chat message
  const handleChatMessage = async (message) => {
    // Add user message
    setChatMessages(prev => [...prev, { role: 'user', content: message }])
    setChatLoading(true)

    try {
      // Mock AI response
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      let response = "I can help with that! Try selecting some text in the editor for AI-powered editing options."
      
      // Check for agent-like requests
      if (message.toLowerCase().includes('search') || message.toLowerCase().includes('find')) {
        response = {
          content: "I found some information for you! Here's what I discovered:",
          searchResults: [
            { title: "Next.js 15 Release Notes", snippet: "Latest features and improvements in Next.js 15..." },
            { title: "React 19 Updates", snippet: "New React features for better performance..." }
          ]
        }
      } else if (message.toLowerCase().includes('insert') || message.toLowerCase().includes('add to editor')) {
        // Simulate inserting content into editor
        const newContent = editorContent + '\n\n[AI Generated Content] Based on your request: ' + message
        setEditorContent(newContent)
        response = "I've added the content to your editor!"
      }
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: typeof response === 'string' ? response : response.content,
        searchResults: typeof response === 'object' ? response.searchResults : undefined
      }])
    } catch (error) {
      console.error('Chat request failed:', error)
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setChatLoading(false)
    }
  }

   // Download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    // Split text into lines to avoid overflow
    const lines = doc.splitTextToSize(editorContent, 180);
    doc.text(lines, 10, 20);
    doc.save('document.pdf');
  };

  // Download as Word
  const handleDownloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(editorContent),
              ],
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="flex h-full relative">
      {/* Floating Download Icon & Buttons */}
      <div
        className="fixed bottom-4 left-1 z-30 flex flex-col items-center group"
        onMouseEnter={() => setShowDownload(true)}
        onMouseLeave={() => setShowDownload(false)}
      >
        {/* Download buttons appear above the icon */}
        <div
          className={`flex flex-col gap-2 mb-3 transition-all duration-300 ${showDownload ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
        >
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-indigo-600 transition-all duration-150 text-sm min-w-[140px] text-left"
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadWord}
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-green-700 hover:to-emerald-600 transition-all duration-150 text-sm min-w-[140px] text-left"
          >
            Download Word
          </button>
        </div>
        <button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg flex items-center justify-center text-white text-2xl hover:scale-105 transition-all duration-200 border-4 border-white/20"
          aria-label="Show download options"
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-8 h-8'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v12m0 0l-4-4m4 4l4-4m-8 8h12' />
          </svg>
        </button>
      </div>

        {/* Editor Section */}
        <div className="flex-1 flex flex-col relative">
            {/* Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
                <SimpleEditor
                    content={editorContent}
                    onChange={setEditorContent}
                    onSelect={handleSelection}
                />
            </div>
            {/* Floating Toolbar */}
            <FloatingToolbar
                selection={selection}
                onEdit={handleEditRequest}
                onClose={()=>setSelection(null)}
            />
        </div>

        {/* Chat Sidebar */}
        <div className="w-96 border-l border-gray-200">
            <ChatSidebar
                messages={chatMessages}
                onSendMessage={handleChatMessage}
                loading={chatLoading}
            />
        </div>

         {/* Preview Modal */}
        <PreviewModal
            isOpen={modal.isOpen}
            original={modal.original}
            suggestion={modal.suggestion}
            loading={modal.loading}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
        />

    </div>
  );

}