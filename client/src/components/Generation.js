import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Timeline from './Timeline';

export default function Generation() {

  const [content, setContent] = useState('');
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

  
  return (
    <>
      <Navbar />
      <Timeline/>
    </>
  )
}