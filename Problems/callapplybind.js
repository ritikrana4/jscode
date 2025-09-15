//call polyfill

Function.prototype.myCall = function(context,...args){
    context = context ? context : globalThis

    const uniqueID = Symbol("func")
    context[uniqueID] =  this

    const result = context[uniqueID](...args);
    delete context[uniqueID]

    return result
}

//apply polyfill

Function.prototype.myApply = function(context,args){
    context = context ? context : globalThis

    const uniqueID = Symbol("func")
    context[uniqueID] =  this

    const result = context[uniqueID](...args);
    delete context[uniqueID]

    return result
}


//bind polyfill

Function.prototype.myBind = function(context,...args){
    const func = this
    return function(...remainingArgs){
       return func.call(context,...args,...remainingArgs)
    }
}