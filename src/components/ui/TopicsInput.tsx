import React, { useState, useCallback } from 'react';

interface TopicsInputProps {
    topics: string[];
    onChange: (topics: string[]) => void;
    placeholder?: string;
    className?: string;
}

const TopicsInput: React.FC<TopicsInputProps> = ({
    topics,
    onChange,
    placeholder = "Enter topics...",
    className = ""
}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTopic = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTopic = inputValue.trim();
            if (newTopic && !topics.includes(newTopic)) {
                onChange([...topics, newTopic]);
                setInputValue('');
            }
        }
    }, [inputValue, topics, onChange]);

    const handleRemoveTopic = useCallback((topicToRemove: string) => {
        onChange(topics.filter(topic => topic !== topicToRemove));
    }, [topics, onChange]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-green-300 focus-within:border-green-500">
                {topics.map((topic, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
                    >
                        {topic}
                        <button
                            type="button"
                            onClick={() => handleRemoveTopic(topic)}
                            className="ml-1 text-purple-500 hover:text-purple-700 focus:outline-none"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleAddTopic}
                    placeholder={topics.length === 0 ? placeholder : "Add another topic..."}
                    className="flex-1 min-w-[120px] outline-none text-sm"
                />
            </div>
            <p className="text-sm text-gray-500">
                Press Enter or comma to add a topic
            </p>
        </div>
    );
};

export default TopicsInput;
