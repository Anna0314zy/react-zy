// import React from 'react';


let {observable, observe} = require('mobx');
class Person {
    @observable name = 'zfpx';
    @observable age = 9;
    @observable wife = {name: 'zs'};
}
// let p1 = new Person;
// observe(p1, c => console.log(c));
// p1.name = 'ppp';
// console.log(p1.name);



const obj = {
    log: ['a', 'b', 'c'],
    get latest() {
      if (this.log.length === 0) {
        return undefined;
      }
      return this.log[this.log.length - 1];
    }
  };
  obj.log = []
  console.log(obj.latest);
  const language = {
    set current(name) {
      this.log.push(name);
    },
    log: []
  };
  
  language.current = 'EN';
  language.current = 'FA';
  
  console.log(language.log);
  // 'getter'
/**console.log('index');
 * 
 * 
@tsettable
class Person{

}
function tsettable(target) {
    target.tsettable = true;
}
// tsettable('aa');
console.log(Person.tsettable, 'person--');
function readonly(target, key, discriptor) {
    discriptor.writable = false;
}
class Circle{
   @readonly PI = 3.14;
}
// function readonly
let c1 = new Circle;
c1.PI = 9;
console.log(c1.PI);
function logger(target, key, disciptor) {
   let oldval = disciptor.value;
   disciptor.value = function() {
       console.log(`${key}(${Array.from(arguments).join(',')})`);
       return oldval.apply(this, arguments);
   }
}*/
// class Calculator{
//     @logger
//     add(a, b) {
//         return a + b;
//     }
// }
// let c2 = new Calculator;
// console.log(c2.add(3,5));
/**let {observable, observe} = require('mobx');
let o1 = observable({name: 'zfpx'});
console.log(o1);
observe(o1, change => console.log(change));//观察
o1.name = 'oo'
let num = observable.box(1);
console.log(num.get());
observe(num, change => console.log(change, 'num---'))

num.set(4);
console.log(num.get());
let bool = observable.box(true);
console.log(bool);
let str = observable.box('hello');
console.log(str);
*/
// let arr1 = observable([1,2,3]);
// console.log(arr1);
// arr1.pop();
// arr1.push(4);
// arr1.unshift(0);
// console.log(arr1);
//proxy
/**let p1 = new Proxy({name:'zfpx', age:9}, {
    get:function(target,key) {
        console.log(`get  ${key}`)
        return Reflect.get(target,key);
    },
    set: function(target,key,value) {
        console.log(`set   ${key} --- ${value}`)
        target[key] = value;
        return Reflect.set(target,key, value);
    }
})
console.log(p1.name, p1.age);
p1.age=10;
*/
