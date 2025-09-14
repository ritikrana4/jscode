//map

Array.prototype.myMap = function (cb,thisarg){ //thisarg if map called with second arg this object
    let result = []
    let arr = this
    let length = arr.length
    for(let i =0;i<length ;i ++){
        if(i in arr){ // for sparse array
            let res =  cb.call(thisarg,arr[i],i,arr)
            result.push(res)
        }
    }
    return result;
}

//foreach

Array.prototype.myForEach = function(cb,thisarg){
    let arr = this 
    let length = arr.length
    for(let i=0;i<length;i++){
        if(i in arr){
         cb.call(thisarg,arr[i],i,arr)
        }
    }
}

//filter

Array.prototype.myFilter = function(cb,thisarg){
    let arr = this
    let length = arr.length
    let result = []
    for(let i =0;i<length;i++){
        if(i in arr){
            let res = cb.call(thisarg,arr[i],i,arr)
            if(res){
                result.push(res)
            }
        }
    }
    return result
}

//reduce

Array.prototype.myReduce = function(cb,initialValue){
    let arr = this
    let length = arr.length
    let acc 
    let startindex

    if(arguments.length > 1){
        acc = initialValue
        startindex = 0
    }else{
        if(length == 0){
            throw new Error("reduce on empty array")
        }
        acc = arr[0]
        startindex = 1
    }

    for(let i = startindex ;i<length;i++){
        if( i in arr){
            let res = cb(acc,arr[i],i,arr)
            acc = res
        }
    }
    return acc
}