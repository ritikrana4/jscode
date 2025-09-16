import { createContext, useState } from "react"

const AccordionContext = createContext()
export const AccordionProvider = ({children}) => {
    const [expand,setExpand] = useState(false)
    return(
        <AccordionContext.Provider value={{expand,setExpand}}>
            {children}
        </AccordionContext.Provider>
    )
}