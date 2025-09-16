import React ,{ useState } from "react"

export const FileExplorer = () => {
        const [activeFolder,setActiveFolder] = useState(null);
    
    const FOLDERS = {
       home: {
            id:"home",
            name:"Home",
            type:"folder",
            parent:null
        },
        folder1: {
            id:"folder1",
            name:"Folder 1",
            type:"folder",
            parent:"home"
        },
       folder2: {
            id:"folder2",
            name:"Folder 2",
            type:"folder",
            parent:"home"
        },
       folder4: {
            id:"folder4",
            name:"Folder 4",
            type:"folder",
            parent:"folder2"
        }

    }
    const getCurrentFolderData = () => {
          const data =  Object.values(FOLDERS).filter((val)=>val.parent === activeFolder)   
          return data 
    }
    const generateBreadcrumb = () => {
        let path = []
        let activeCursor = activeFolder

        while(activeCursor){
            const folder = FOLDERS[activeCursor]
            if(!folder){
                break;
            }
            path.unshift({name:folder.name,id:folder.id})
            activeCursor = folder.parent
        }
        return path
    }

    const handleBreadclick = (val) => {
        console.log(val)
        setActiveFolder(val.id)
    }
    console.log(getCurrentFolderData(),generateBreadcrumb())

    return(
        <div>
            <div style={{display:"flex",gap:"4px",border:"1px solid blue"}}>
                {generateBreadcrumb().map(val => <div onClick={() => handleBreadclick(val)}>{val.name + "/"  }</div>)}
            </div>
            <div>
                {getCurrentFolderData().length>0?getCurrentFolderData().map((val)=><div onClick={()=>setActiveFolder(val.id)}>{val.name}</div>):"no data"}
            </div>
        </div>
    )
}