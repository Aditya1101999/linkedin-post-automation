import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';export default function ContentQuery({ content, setContent }) {

    const [contentQuery, setContentQuery] = useState('');

    const handleGenerateContent = async () => {
        try {
          const contentResponse = await axios.post(
            'https://linkedin-post-automation.onrender.com/api/v1/generate-content',
            {
              query: contentQuery,
            }
          );
          const generatedContent = contentResponse.data.content;
          setContent(generatedContent);
        } catch (error) {
          console.error('Error generating content:', error);
        }
    };

    return (
        <>
            <div className="p-6 bg-white border border-zinc-300 rounded-md shadow-xl">
                <h3 className="text-2xl font-ubuntu">Content Generation</h3>
                <textarea
                    value={contentQuery}
                    onChange={(e) => setContentQuery(e.target.value)}
                    placeholder="Enter prompt for LinkedIn post content"
                    className="w-full h-32 px-4 py-2 mt-2 bg-gray-100 border border-zinc-400 rounded-md resize-none"
                />
                <button
                    onClick={handleGenerateContent}
                    className="flex items-center justify-center px-4 py-2 mt-2 text-white bg-slate-700 hover:bg-black rounded-md font-ubuntu"
                >
                    Generate Content{' '}
                    <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
                </button>
                {content && (
                    <div>
                        <h4 className="mt-4 text-lg font-semibold">Generated Content:</h4>
                        <Markdown className="mt-4 bg-zinc-100 border border-zinc-200 rounded-md p-6">
                            {content}
                        </Markdown>
                    </div>
                )}
            </div>
        </>
    )
}