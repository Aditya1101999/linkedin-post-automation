import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast'
import { useState } from "react";


export default function Schedule({ content, selectedDays, setSelectedDays }) {
  const [status, setStatus] = useState('');

  const daysList = [
    { "id": 0, "label": "Sun" },
    { "id": 1, "label": "Mon" },
    { "id": 2, "label": "Tue" },
    { "id": 3, "label": "Wed" },
    { "id": 4, "label": "Thu" },
    { "id": 5, "label": "Fri" },
    { "id": 6, "label": "Sat" },
  ]

  const selectedDayNames = selectedDays.map(dayId => {
    const dayObj = daysList.find(day => day.id === dayId);
    return dayObj ? dayObj.label : "";
  });

  const handlePostToLinkedIn = async () => {
    try {
      const postResponse = await axios.post(
        'http://localhost:5000/api/v1/post-linkedin',
        {
          generated_content: content,
          image_path: 'generated_image.png',
        }
      );

      setStatus(postResponse.data.status);
      toast.success("Content successfully uploaded to LinkedIn.", { duration: 5000 })
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      toast.error(`Error posting to LinkedIn due to ${error}`, { duration: 5000 })
    }
  };

  const handleAutomatedPosts = async () => {

    const today = new Date().getDay()
    if (selectedDays.includes(today)) {
      setStatus(`Posting today for day ${selectedDayNames[selectedDays.indexOf(today)]}`)
      await handlePostToLinkedIn()
      setStatus("Posting completed for the current day.")
    }
    else {
      setStatus("No Posts to be scheduled for today.")
    }

  }

  return (
    <div className="max-width">
      <Toaster position="top-center" />

      <div>
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
        <h1 className="text-2xl font-bebas mt-10">Choose days to schedule</h1>
        <p className="text-md font-montserrat mt-3 text-gray-500">Select the days of the week to be active.</p>

        <div className="flex flex-row items-center mt-3 gap-3">
          {daysList.map((step) => (
            <div className={`cursor-pointer p-3 shadow-sm bg-white rounded-xl w-full border-2  font-montserrat text-center ${selectedDays.includes(step.id) ? "border-blue-500" : "border-gray-300"}`} key={step.id} onClick={() => setSelectedDays(prev => prev.includes(step.id) ? prev.filter(id => id !== step.id) : [...prev, step.id])}>{step.label}</div>
          ))}
        </div>

      </div>
    </div>
  )
}