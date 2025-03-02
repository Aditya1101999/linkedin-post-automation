import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import {SyncLoader} from 'react-spinners'

export default function ContentQuery({ content, setContent }) {

    const [contentQuery, setContentQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateContent = async () => {
        setLoading(true);
        try {
          const contentResponse = await axios.post(
            'http://localhost:5000/api/v1/generate-content',
            {
              query: contentQuery,
            }
          );
          const generatedContent = contentResponse.data.content;
          setContent(generatedContent);
          setLoading(false);
        } catch (error) {
          console.error('Error generating content:', error);
        }
    };

    return (
        <>
            <div className="p-6 bg-white border border-zinc-300 rounded-xl shadow-md">
                <h3 className="text-md font-montserrat font-semibold">Content Generation</h3>
                <textarea
                    value={contentQuery}
                    onChange={(e) => setContentQuery(e.target.value)}
                    placeholder="Enter prompt for LinkedIn post content"
                    className="w-full h-32 p-6 mt-2 bg-zinc-100 border border-zinc-300 rounded-xl resize-none font-montserrat"
                />
                <button
                    onClick={handleGenerateContent}
                    className={`flex items-center justify-center px-4 py-2 mt-2 text-white rounded-full font-montserrat text-md ${loading ? 'bg-gray-400 cursor-not-allowed' :' bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? (<> Generating Content <SyncLoader className='ml-2' size={5} color='#ffffff' /></>): (<>Generate Content <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />'</>)}
                    
                </button>
                {content && (
                    <div>
                        <h4 className="mt-5 text-md font-montserrat font-semibold">Generated Content:</h4>
                        <Markdown className="mt-4 bg-zinc-100 border border-zinc-300 rounded-xl p-6">
                            {content}
                        </Markdown>
                    </div>
                )}
            </div>
        </>
    )
}