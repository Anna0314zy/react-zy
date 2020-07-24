
import React from 'react';
export default function(Comp) {
    return class extends React.Component{
        componentWillMount() {
            console.time('cost')
            this.start = Date.now();
        }
        componentDidMount() {
            console.timeEnd('cost')
            console.log(Date.now() - this.start + 'ms');
        }
        render() {
            return <Comp {...this.props}/>
        }
    }
}