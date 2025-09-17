import {  useEffect, useRef } from "react"

const dependChange = (prevDep,newDep) => {
    if(prevDep === null) return false
    if(prevDep?.length !== newDep.length) return false
    for(let i = 0;i<newDep.length;i++){
        if(prevDep[i] !== newDep[i]){
            return false
        }
    }
    return true
}
export const useMyCallback = (cb,depArr) => {
    
    const memoRef = useRef()

    //check dep change
    if(!memoRef.current || !dependChange(memoRef.current.dep,depArr)){
        memoRef.current = {
            val:cb,
            dep:depArr
        }
    }

    useEffect(()=>{
        return ()=>{
            memoRef.current = null
        }
    },[])

    return memoRef.current.val

}