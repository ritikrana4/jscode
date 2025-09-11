
const STATE = {
    pending : "PENDING",
    rejected : "REJECTED",
    fullfilled : "FULLFILLED"
}

class MyPromise{
    //ingredients
    value = ""
    state = STATE.pending
    thencbs = []
    catchcbs = []
    finalcbs = []
    resolve = this.resolve.bind(this)
    reject = this.reject.bind(this)

    constructor(executor){
        try{
            executor(this.resolve,this.reject)
        }catch(error){
            this.reject(error)
        }
    }

    runCallbacks(){
        if(this.state == STATE.fullfilled){
            this.thencbs.forEach(thencb => thencb(this.value))   
        }
        if(this.state == STATE.rejected){
            this.catchcbs.forEach(catchcb => catchcb(this.value))
        }
        if(this.state != STATE.pending){
            this.finalcbs.forEach(finallycb => finallycb())
        }

        this.thencbs = []
        this.catchcbs = []
        this.finalcbs = []
    }

    resolve(val){
        if(this.state == STATE.pending){
            this.value = val
            this.state = STATE.fullfilled
            this.runCallbacks()
        }else{
            return
        }
    }
    reject(error){
        if(this.state == STATE.pending){
            this.value = error
            this.state = STATE.rejected
            this.runCallbacks()
        }else{
            return
        }
    }

    then(thencb,catchcb){
        if(thencb){
            this.thencbs.push(thencb)
        }
        if(catchcb){
            this.catchcbs.push(catchcb)
        }
        this.runCallbacks()
        return this
    }

    catch(catchcb){
       return this.then(undefined,catchcb) 
    }

    finally(finallycb){
        this.finalcbs.push(finallycb)
        this.runCallbacks()
        return this
    }

    static resolve(data){
        return new MyPromise((resolve)=>resolve(data))
    }

    static reject(error){
        return new MyPromise((_,reject)=>reject(error))
    }

    static all(promises){ // resolve > when all fullfiled // reject as soon as any rejects
        const result= []
        let count = 0
        return new MyPromise((resolve,reject)=>{
            promises.forEach((promise,index) => {
                promise.then(res => {
                    result[index] = res
                    count++
                    if(count == promises.length){
                        resolve(result)
                    }
                }).catch(error=>{
                    reject(error)
                })
            } )
        })

    }

    static allsettled(promises){ //resolve when all promises settled , never rejects
        const result= []
        let count = 0
        return new MyPromise((resolve,reject)=>{
            promises.forEach((promise,index) => {
                promise.then(res => {
                    result[index] = res
                }).catch((error)=>{
                    result[index] = error
                }).finally(()=>{
                    count++
                    if(count == promises.length){
                        resolve(result)
                    }
                })
            } )
        })
    }

    static race(promises){ //resolves or reject when first promise fullfilled and reject
        return new MyPromise((resolve,reject)=>{
            promises.forEach((promise,index) => {
                promise.then(res => {
                   resolve(res)
                }).catch(error=>{
                   reject(error)
                })
            } )
        })
    }

    static any(promises){ // resolves when any promise fullfilled , reject when all reject
        const errors= []
        let count = 0
        return new MyPromise((resolve,reject)=>{
            promises.forEach((promise,index) => {
                promise.then(res => {
                    resolve(res)
                }).catch(error=>{
                    errors[index] = error
                    count++
                    if(count == promises.length){
                     reject(new AggregateError(error,"All promises reject"))
                    }
                })
            } )
        })
        
    }


}