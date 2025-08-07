import React, { useRef } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ShiftSelect } from '../ui/Select/ShiftSelect';
import TopicsInput from '../ui/TopicsInput';
import RichTextEditor from '../ui/RichTextEditor';
import { FormData } from '../../pages/Admin/JournalManagement';

interface JournalModalProps {
    open: boolean;
    form: FormData;
    isLoading: boolean;
    onClose: () => void;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => void;
    handleRichTextChange: (field: string, value: string) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    modalTitle: string;
    submitLabel: string;
    imageSrc?: string;
    imageError?: string | null;
    handleSelectChange: (section: string, value: string) => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: 'calc(100vh - 40px)',
    overflow: 'auto',
    width: '100%',
    maxWidth: 'min(800px, calc(100vw - 32px))',
    borderRadius: '16px'
};

const JournalModal: React.FC<JournalModalProps> = ({
    open,
    form,
    isLoading,
    onClose,
    handleChange,
    handleRichTextChange,
    handleFileChange,
    handleSubmit,
    modalTitle,
    submitLabel,
    imageSrc,
    imageError,
    handleSelectChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            sx={{ zIndex: 10000 }}
            style={{ overflow: 'auto' }}
        >
            <Box sx={{ ...style }}>
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full relative animate-slide-up">
                    <h2 className="text-2xl font-bold mb-4 text-green-700">{modalTitle}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Summary</label>
                            <textarea
                                name="summary"
                                value={form.summary}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-300"
                                required
                                rows={3}
                                placeholder="Enter a brief summary of the journal entry..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Description</label>
                            <RichTextEditor
                                value={form.description}
                                onChange={(value) => handleRichTextChange('description', value)}
                                placeholder="Write your journal content here..."
                                className="w-full"
                            />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-1 font-medium">Shift</label>
                            <ShiftSelect 
                                selectedValue={form.shift}
                                onChange={shift => handleSelectChange('shift', shift)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-1 font-medium">Topics</label>
                            <TopicsInput
                                topics={form.topics}
                                onChange={(topics) => handleSelectChange('topics', JSON.stringify(topics))}
                                placeholder="Enter topics (e.g., Mindfulness, Meditation, Wellness)"
                            />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-1 font-medium text-center">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            <div onClick={handleImageClick} className="cursor-pointer flex justify-center">
                                {imageSrc ? (
                                    <img src={imageSrc} alt="Preview" className="w-24 h-18 object-cover rounded mt-2 border-2 border-green-300 hover:border-green-500 transition" />
                                ) : (
                                    <div className="w-24 h-18 flex items-center justify-center bg-gray-100 rounded mt-2 border-2 border-dashed border-green-300 hover:border-green-500 transition text-gray-400">
                                        +
                                    </div>
                                )}
                            </div>
                            {imageError && (
                                <div className="text-red-500 text-sm text-center mt-1">{imageError}</div>
                            )}
                        </div>
                        
                        <div className="col-span-2 flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-whitwe rounded font-semibold hover:from-green-600 hover:to-blue-600"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : submitLabel}
                            </button>
                        </div>
                    </form>
                </div>
            </Box>
        </Modal>
    );
};

export default JournalModal; 