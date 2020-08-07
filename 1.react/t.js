class Counter {
    constructor(props) {
        this.props = props
    }
    father() {
        console.log('father---')
    }
}
class Child extends Counter{
    add() {
        console.log('add')
        console.log('zilei',this.father())
    }
}
new Child().add()
