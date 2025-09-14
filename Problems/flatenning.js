//flat object

const input = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
       L: 56
    },
    Q: [1, 2]
   }   
}

const output = {
  "A": "12",
  "B": 23,
  "C.O.L": 56,
  "C.P": 23,
  "C.Q.0": 1,
  "C.Q.1": 2,
}

function flatenObject(obj,result={},parentkey=null){
    if(Array.isArray(obj)){
        obj.forEach((val,index) => {
            let newkey = parentkey ? parentkey + "." + index : i
            flatenObject(val,result,newkey)
        })
    }
    else if(typeof obj == "object"){
        for(let key in obj){
            let newkey = parentkey ? parentkey + "." + key : key
            flatenObject(obj[key],result,newkey)
        }
    }else{
        console.log(parentkey)
        result[parentkey] = obj
    }
    return result
}

console.log(flatenObject(input))


//flat array

const arr = [1,3,[4,5,6],[1,2,[4,3,5]]]

function flattenArray(arr,result=[]){
    if(Array.isArray(arr)){
        arr.forEach(val=>{
          flattenArray(val,result)
        })
    }else{
        result.push(arr)
    }
    return result
}

console.log(flattenArray(arr))
