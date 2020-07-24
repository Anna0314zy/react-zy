function setState() {
    console.log('setState')
}
//事务
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers;
    }
    perform(anyMethod) {
        this.wrappers.forEach(wrapper => wrapper.initialize());
        anyMethod.call();
        this.wrappers.forEach(wrapper => wrapper.close());
    }
}
let transaction = new Transaction([{
    initialize() {
        console.log('initialize')
    },
    close() {
        console.log('close')
    }
},{
    initialize() {
        console.log('initialize1')
    },
    close() {
        console.log('close1')
    }
}])
transaction.perform(setState);
