import React, {Component} from 'react'
import {observable,action} from 'mobx';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
class Store {
    @observable number = 0;
    @action.bound
    add() {
        console.log(this, 'this');
        this.number = this.number + 1;
    }

}
@observer
class Counter extends Component {
    render() {
        let store = this.props.store;
        console.log(store, 'STORE---');

        return (
            <div>
                <p>{store.number}</p>
                <button onClick={store.add}>+</button>
                </div>
        )
    }
}
let store = new Store;
class Ticker {
    @observable tick = 0

    @action.bound
    increment() {
        console.log(this)
        this.tick++ // 'this' 永远都是正确的
        console.log(this.tick)

    }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)
ReactDOM.render(<Counter store={store}/>, document.getElementById('root'))