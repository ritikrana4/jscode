import { useState } from "react"
import { AccordionProvider } from "./AccordionContext"

export const Accordion = ({title,content}) => {

    const AccordionHeader = ({title}) => {
        const [expand,setExpand] = useState(false)
        const handleExpand = () => {
            setExpand((prev) => !prev)
        }
        return (
            <div>
                <div>
                    {title}
                </div>
                <div onClick={()=> handleExpand()}>
                    Expand
                </div>
            </div>
        )
    }

    const AccordionContent = ({content})=>{
        return(<div>
            {content}
        </div>)
    }
    return(
        <AccordionProvider>
            <AccordionHeader title={title}/>
            {expand ?<AccordionContent content={content}/> : null}
        </AccordionProvider>
    )
}