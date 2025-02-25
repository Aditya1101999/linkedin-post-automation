import { useState } from "react";
export default function Schedule({days, setDays}){

    const [status, setStatus] = useState('');

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
        <div className="max-w-3xl m-auto flex text-center items-center justify-center mt-4 space-x-4">

        <h1 className="font-montserrat text-xl">Automate your content for <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          placeholder="Enter the number of days"
          className="p-4 bg-white border border-zinc-300 rounded-xl shadow-md"
        /> days. </h1>    



        
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