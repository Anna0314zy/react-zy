function* gen() {
yield 1;
yield 2;
yield 3;
}
let it = gen();
it.next();
it.return('直接结束')