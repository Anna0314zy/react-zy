function* G() {
  const a = yield 100
  console.log('a', a)  // a aaa
  const b = yield 200
  console.log('b', b)  // b bbb
  const c = yield 300
  console.log('c', c)  // c ccc
}
const g = G()
g.next()    // value: 100, done: false
g.next('aaa') // a aaa   value: 200, done: false   
g.next('bbb') //   b bbb  value: 300, done: false
g.next('ccc') //c ccc  value: undefined, done: true