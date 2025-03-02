import { useState } from "react";
export default function Schedule({ days, setDays }) {

  const [status, setStatus] = useState('');

  const [selectedDays, setSelectedDays] = useState([]);

  const daysList = [
    { "id": 0, "label": "Mon" },
    { "id": 1, "label": "Tue" },
    { "id": 2, "label": "Wed" },

    { "id": 3, "label": "Thu" },
    { "id": 4, "label": "Fri" },
    { "id": 5, "label": "Sat" },

    { "id": 6, "label": "Sun" },
  ]

  const handleAutomatedPosts = async () => {
    const limit = 24 * 60 * 60;
    for (let day = 0; day < days; day++) {
      setStatus(`Posting for day ${day + 1}`);
      //   await handlePostToLinkedIn();

      if (day < days - 1) {
        await new Promise((resolve) => setTimeout(resolve, limit));
      }
    }

    setStatus('All posts completed');
  };

  return (
    <div className="max-width mt-3">
      <h1 className="text-2xl font-bebas">Choose your Schedule Strategy</h1>
      <p className="text-md font-montserrat mt-3 text-gray-500">Choose the hours and days you want to post to LinkedIn automatically. You can choose a default one or can customise one.</p>
      <div className="flex flex-row mt-3 gap-5">
        <div className="w-full p-6 border-2 shadow-sm border-blue-500 rounded-xl bg-white">
          <h1 className="font-montserrat text-md font-semibold text-slate-900">Default</h1>
          <p className="font-montserrat text-md text-gray-500 mt-3">Suited best for posting the content for one day at a designated time.</p>
        </div>
        <div className="w-full p-6 border-2 shadow-sm border-gray-300 rounded-xl bg-white">
          <h1 className="font-montserrat text-md font-semibold text-slate-900">Custom</h1>
          <p className="font-montserrat text-md text-gray-500 mt-3">Choose your days for the content to be posted on LinkedIn.</p>
        </div>

      </div>

      <div>
        <h1 className="text-2xl font-bebas mt-10">Eligible Days</h1>
        <p className="text-md font-montserrat mt-3 text-gray-500">Select the days of the week to be active.</p>

        <div className="flex flex-row items-center mt-3 gap-3">
          {daysList.map((step) => (
            <div className={`cursor-pointer p-3 shadow-sm bg-white rounded-xl w-full border-2  font-montserrat text-center ${selectedDays.includes(step.id) ? "border-blue-500" : "border-gray-300"}`} key={step.id} onClick={() => setSelectedDays(prev => prev.includes(step.id) ? prev.filter(id => id !== step.id) : [...prev, step.id])}>{step.label}</div>
          ))}
        </div>

      </div>





      {/* <h1 className="font-montserrat text-xl">Automate your content for <input
        type="number"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        placeholder="Enter the number of days"
        className="p-4 bg-white border border-zinc-300 rounded-xl shadow-md"
      /> days. </h1> */}




      {/* <button
          onClick={handleAutomatedPosts}
          disabled={days < 1}
          className={`flex items-center justify-center px-4 py-2 text-white rounded-md font-ubuntu ${days < 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-slate-700 hover:bg-black'
            }`}
        >
          Automate for {days} days{' '}
          <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
        </button> */}
    </div>
  )
}