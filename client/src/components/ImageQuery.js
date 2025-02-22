import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';

export default function ImageQuery({image, setImage}){
    const [imageQuery, setImageQuery] = useState('');
    
    const handleGenerateImage = async () => {
        try {
          const imageResponse = await axios.post(
            'https://linkedin-post-automation.onrender.com/api/v1/generate-image',
            {
              query: imageQuery,
            },
            { responseType: 'blob' }
          );
    
          const imageURL = URL.createObjectURL(imageResponse.data);
          setImage(imageURL);
        } catch (error) {
          console.error('Error generating image:', error);
        }
      };
    return(
        <>
        
        <div className="p-6 bg-white border border-zinc-300 rounded-md shadow-xl">
          <h3 className="text-2xl font-ubuntu">Image Generation</h3>
          <textarea
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn image"
            className="w-full h-32 px-4 py-2 mt-2 bg-gray-100 border border-zinc-400 rounded-md resize-none"
          />
          <button
            onClick={handleGenerateImage}
            className="flex items-center justify-center px-4 py-2 mt-2 text-white bg-slate-700 hover:bg-black rounded-md font-ubuntu"
          >
            Generate Image{' '}
            <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
          </button>
          {image && (
            <div>
              <h4 className="mt-4 text-lg font-semibold">Generated Image:</h4>
              <img src={image} alt="Generated" className="mt-2 rounded-md" />
            </div>
          )}
        </div>
        </>
    )
}