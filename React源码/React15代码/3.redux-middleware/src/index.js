import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import Counter1 from './components/Counter1';
import {Provider} from './react-redux';
import {store,persistor} from './store';
import {PersistGate} from './redux-persist/integration/react';
import './components/1'
class Main extends React.Component{
    state = {show:true}
    render(){
        return (
            <div>
            <button onClick={()=>this.setState({show:false})}>+</button>
            {
                this.state.show&&(
                     <PersistGate persistor={persistor}>
                       <Counter/>
                       <Counter1/>
                    </PersistGate>
                )
            }
            </div>
           
        )
    }
}
ReactDOM.render(<Provider store={store}>
<Main/>
</Provider>,document.getElementById('root'));
