import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';

export default function ImageQuery({image, setImage}){
    const [imageQuery, setImageQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleGenerateImage = async () => {
        setLoading(true);
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
          setLoading(false);
        } catch (error) {
          setLoading(false)
          console.error('Error generating image:', error);
        }
      };
    return(
        <>
        
        <div className="p-6 bg-white border border-zinc-300 rounded-xl shadow-md">
          <h3 className="text-md font-montserrat font-semibold">Image Generation</h3>
          <textarea
            value={imageQuery}
            onChange={(e) => setImageQuery(e.target.value)}
            placeholder="Enter prompt for LinkedIn Image"
            className="w-full h-32 p-6 mt-2 bg-zinc-100 border border-zinc-300 rounded-xl resize-none font-montserrat"
          />
          <button
            onClick={handleGenerateImage}
            className={`flex items-center justify-center px-4 py-2 mt-2 text-white rounded-full font-montserrat text-md ${loading ? 'bg-gray-400 cursor-not-allowed hover:bg-red-600' :' bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Generating Image' : 'Generate Image'}
            <FontAwesomeIcon icon={faWandMagicSparkles} className="ml-2" />
          </button>
          {image && (
            <div>
              <h4 className="mt-5 text-md font-montserrat font-semibold">Generated Image:</h4>
              <img src={image} alt="Generated" className="mt-2 rounded-xl" />
            </div>
          )}
        </div>
        </>
    )
}