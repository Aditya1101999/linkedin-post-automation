import Markdown from "react-markdown"
export default function Preview({ content, image, days }) {
    return (
        <>
            {/* <img>{image}</img>
        <h3>{days}</h3>
         */}
            <h1 className="max-width text-md font-montserrat font-semibold">Preview And Automate</h1>
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
                </div>
            </div>
        </>
    )
}