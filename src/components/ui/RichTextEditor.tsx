import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import '../../assets/styles/rich-text-editor.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = "Start writing your content...",
    className = "",
    readOnly = false
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-green-600 underline cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        editable: !readOnly,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const removeLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    return (
        <div className={`rich-text-editor ${className}`}>
            {!readOnly && (
                <div className="toolbar">
                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'active' : ''}
                            title="Bold"
                        >
                            <strong>B</strong>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'active' : ''}
                            title="Italic"
                        >
                            <em>I</em>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={editor.isActive('underline') ? 'active' : ''}
                            title="Underline"
                        >
                            <u>U</u>
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? 'active' : ''}
                            title="Strike"
                        >
                            <s>S</s>
                        </button>
                    </div>

                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
                            title="Heading 1"
                        >
                            H1
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
                            title="Heading 2"
                        >
                            H2
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
                            title="Heading 3"
                        >
                            H3
                        </button>
                    </div>

                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'active' : ''}
                            title="Bullet List"
                        >
                            •
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'active' : ''}
                            title="Numbered List"
                        >
                            1.
                        </button>
                    </div>

                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}
                            title="Align Left"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}
                            title="Align Center"
                        >
                            ↔
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}
                            title="Align Right"
                        >
                            →
                        </button>
                    </div>

                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={addLink}
                            className={editor.isActive('link') ? 'active' : ''}
                            title="Add Link"
                        >
                            🔗
                        </button>
                        {editor.isActive('link') && (
                            <button
                                type="button"
                                onClick={removeLink}
                                title="Remove Link"
                            >
                                🗑️
                            </button>
                        )}
                    </div>

                    <div className="toolbar-group">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'active' : ''}
                            title="Quote"
                        >
                            "
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'active' : ''}
                            title="Code Block"
                        >
                            {'</>'}
                        </button>
                    </div>
                </div>
            )}
            <div className="editor-content">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default RichTextEditor;
