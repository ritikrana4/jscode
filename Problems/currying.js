//function that returns sum of prev values

function currysum(){
    result = 0;
    return function(num = 0){
        result = result + num
        return result
    }
}

const sum = currysum()
sum(1)
sum(4)
sum(10)
console.log(sum(1))

//sum(1)(2)(3)(4)()




