// components/RichTextEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Undo, Redo, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = "Describe your package..." }) => {
  const [isHeadingDropdownOpen, setIsHeadingDropdownOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[150px] px-4 py-3',
      },
    },
  });

  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);
  

  if (!editor) return null;
  const HEADING_LEVELS = [
    { level: 1, label: 'Heading 1' },
    { level: 2, label: 'Heading 2' },
    { level: 3, label: 'Heading 3' },
  ];
  const getActiveHeadingLevel = () => {
    for (const { level } of HEADING_LEVELS) {
      if (editor.isActive('heading', { level })) {
        return `H${level}`;
      }
    }
    return 'P';
  };
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition-all">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex flex-wrap items-center gap-1">
        {/* Heading Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsHeadingDropdownOpen(!isHeadingDropdownOpen)}
            className="p-2 rounded hover:bg-gray-200 transition-all flex items-center"
            title="Headings"
          >
            <span className="w-6 text-sm font-semibold">{getActiveHeadingLevel()}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isHeadingDropdownOpen && (
            <div className="absolute top-full left-0 bg-white border shadow-lg rounded-md mt-1 z-10">
                 <button
                type="button"
                onClick={() => { editor.chain().focus().setParagraph().run(); setIsHeadingDropdownOpen(false); }}
                className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100"
              >
                Paragraph
              </button>
              {HEADING_LEVELS.map(({ level, label }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => { editor.chain().focus().toggleHeading({ level }).run(); setIsHeadingDropdownOpen(false); }}
                  className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${editor.isActive('heading', { level }) ? 'bg-red-100' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
         <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-all ${editor.isActive('bold') ? 'bg-red-100 text-red-700' : ''}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-all ${editor.isActive('italic') ? 'bg-red-100 text-red-700' : ''}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-all ${editor.isActive('bulletList') ? 'bg-red-100 text-red-700' : ''}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-all ${editor.isActive('orderedList') ? 'bg-red-100 text-red-700' : ''}`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 hover:bg-gray-200 disabled:opacity-40"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-40"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
};

export default RichTextEditor;
