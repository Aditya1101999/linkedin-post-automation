import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center">
        <Landing />
      </div>
    </div>
  );
}


export default App;
