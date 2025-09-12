function deepClone(obj) {
    //base
    if (obj === null || typeof obj !== "object") {
        return obj
    }
    //array handling
    if (Array.isArray(obj)) {
        return obj.map(val => deepClone(val))
    }
    //start
    const result = {}
    for (key in obj) {
        result[key] = deepClone(obj[key])
    }

    return result
}

const obj = {
    a: {
        b: 2,
        c: {
            d: [1, 2, 3]
        }
    },
    e: 2

}

const obj2 = deepClone(obj)

obj2.a.c.d = "hello"
console.log(obj, obj2)