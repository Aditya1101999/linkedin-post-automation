import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import ContentQuery from './components/ContentQuery';
import ImageQuery from './components/ImageQuery';
import Landing from './components/Landing';

function App() {

  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');
  const [days, setDays] = useState(1);

  const handlePostToLinkedIn = async () => {
    try {
      const postResponse = await axios.post(
        'https://linkedin-post-automation.onrender.com/api/v1/post-linkedin',
        {
          generated_content: content,
          image_path: 'generated_image.png',
        }
      );

      setStatus(postResponse.data.status);
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
    }
  };

  const handleAutomatedPosts = async () => {
    const limit=24*60*60;
    for (let day = 0; day < days; day++) {
      setStatus(`Posting for day ${day + 1}`);
      // await handleGenerateContent();
      // await handleGenerateImage();
      await handlePostToLinkedIn();

      if (day < days - 1) {
        await new Promise((resolve) => setTimeout(resolve, limit));
      }
    }

    setStatus('All posts completed');
  };

  return (
    <div>
      <Navbar />

      <Landing/>
      
      <div className="max-width flex items-center justify-between mt-4 space-x-4">
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          placeholder="Enter the number of days"
          className="flex-grow px-4 py-2 bg-gray-100 border border-zinc-400 rounded-md"
        />
        <button
          onClick={handleAutomatedPosts}
          disabled={days < 1}
          className={`flex items-center justify-center px-4 py-2 text-white rounded-md font-ubuntu ${
            days < 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-slate-700 hover:bg-black'
          }`}
        >
          Automate for {days} days{' '}
          <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
        </button>
      </div>

      {status && (
        <div className="max-width">
          {status === 'success' ? (
            <h4 className="text-md w-40 bg-green-200 border border-green-300 px-4 py-2 rounded-md font-ubuntu">
              Status: {status}
            </h4>
          ) : (
            <h4 className="text-md w-40 bg-red-200 border border-red-300 px-4 py-2 rounded-md font-ubuntu">
              Status: {status}
            </h4>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-8 max-width mb-8">

       <ContentQuery content={content} setContent={setContent}/>

       <ImageQuery image={image} setImage={setImage}/>
      </div>
    </div>
  );
}

export default App;
