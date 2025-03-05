import Markdown from "react-markdown"
import { useState } from "react";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

import toast, {Toaster} from 'react-hot-toast'

export default function Preview({ content, image, selectedDays, selectedDayNames }) {
    
    const [status, setStatus] = useState('');
   
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
          toast.success("Content successfully uploaded to LinkedIn.", {duration:5000})
        } catch (error) {
          console.error('Error posting to LinkedIn:', error);
          toast.error(`Error posting to LinkedIn due to ${error}`, {duration:5000})
        }
      };

    const handleAutomatedPosts = async () => {
      
      const today = new Date().getDay()
      if(selectedDays.includes(today)){
        setStatus(`Posting today for day ${selectedDayNames[selectedDays.indexOf(today)]}`)
        await handlePostToLinkedIn()
        setStatus("Posting completed for the current day.")
      }
      else{
        setStatus("No Posts to be scheduled for today.")
      }
      
    }
    
    return (
        <>
            <div className="max-width">
            <Toaster position="top-center"/>
                <h1 className=" text-2xl font-bebas">Preview And Automate</h1>
                <div className="flex justify-between">
                  <h2 className="font-montserrat text-md mt-5">Selected days for automation: {selectedDayNames.join(", ") || "No days selected"}</h2>
                  <button
                    onClick={handleAutomatedPosts}
                    className={`flex items-center justify-center px-4 py-2 text-white rounded-md font-montserrat ${selectedDays < 1
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700'
                      }`}
                  >
                    Automate 
                    <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                  </button>
                </div>
            </div>
            <div className="max-width m-auto bg-gray-100 mt-5 flex items-center justify-center">

                <div className="bg-white border shadow-sm px-4 py-3 rounded-lg w-full">
                    <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-gray-200" />
                        <div className="ml-2">
                            <div className="text-sm font-montserrat">
                                <span className="font-semibold">John Doe</span>
                                <span className="text-gray-500"> • 1st</span>
                            </div>
                            <div className="text-gray-500 text-xs font-montserrat">Software Engineer at Tesla, Inc</div>
                            <div className="text-gray-500 text-xs font-montserrat flex">
                                <span className="inline-block">3d • Edited</span>
                            </div>
                        </div>
                    </div>
                    <Markdown className="mt-4 p-2 font-montserrat">
                        {content ? content : ("Your Generated Content goes here")}
                    </Markdown>
                    <img src={image} className="rounded-xl"></img>

                </div>
            </div>
        </>
    )
}
