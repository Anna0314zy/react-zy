//
// let arr = [1,2,3];
// console.log(arr[Symbol.iterator])
// let it = arr[Symbol.iterator]();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
// { value: undefined, done: true }
let obj ={
    name:'zhufeng',
    age:10,
    [Symbol.iterator]() {
        let that = this;
        // console.log(this, 'this---')
        let values = Object.values(that);//['zhufeng', 10]
        // console.log('values---',values);
        let index = 0;
        return {
            next() {
                let value =values[index];
                let done = index >= values.length;
                index++;
                return {
                    value,
                    done

                }
            }
        }
    }
}
// console.log(obj[Symbol.iterator]) //undefined 对象没有这个属性哟
// let it = obj[Symbol.iterator]();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
function* gen() {
    yield 1;
    yield 2;
}
console.log(gen[Symbol.iterator])
let it2 = gen();//迭代器
console.log(it2[Symbol.iterator])


