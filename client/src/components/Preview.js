import Markdown from "react-markdown"
export default function Preview({content, image, days}){
    return (
        <>
        <Markdown className="mt-4 bg-zinc-100 border border-zinc-300 rounded-xl p-6">
                            {content}
                        </Markdown>
        <img>{image}</img>
        <h3>{days}</h3>
        </>
    )
}