import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import ContentQuery from "./ContentQuery";
import ImageQuery from "./ImageQuery";
import Schedule from "./Schedule";
import Preview from "./Preview";

export default function Timeline() {
    const [active, setActive] = useState(0);
    const [days, setDays] = useState(1);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    
    
    const steps = [
        { id: 0, label: "Generate Content" },
        { id: 1, label: "Generate Image" },
        { id: 2, label: "Schedule Content" },
        { id: 3, label: "Preview & Send" }
    ];

    return (
        <>
            <div className="max-w-3xl mx-auto mt-10 flex justify-between mb-10">
                {steps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center w-1/4">
                            <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                                active >= step.id ? "border-blue-600 bg-blue-100" : "border-gray-300 bg-white"
                            }`}
                        >
                            {active > step.id ? <CheckCircle className="text-blue-600 w-3 h-3" /> : <Circle className="text-gray-400 w-3 h-3" />}
                        </div>
                        <button
                            onClick={() => setActive(step.id)}
                            className={`mt-3 text-sm font-medium font-montserrat transition-all ${
                                active >= step.id ? "text-blue-600 font-semibold" : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {step.id + 1}. {step.label}
                        </button>
                    </div>
                ))}
            </div>
            <div className="max-width">
            {active === 0 ? (
                    <ContentQuery content={content} setContent={setContent} />
                ) : active === 1 ? (
                    <ImageQuery image={image} setImage={setImage} />
                ) : active === 2 ? (
                    <Schedule days={days} setDays={setDays}/>
                ) : (
                    <Preview content={content} image={image} days={days}/>
                )}
                </div>
        </>
    );
}
