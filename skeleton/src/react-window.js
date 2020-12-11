import React from 'react';
{/*<List*/}
{/*    height={150}*/}
{/*    itemSize={30}*/}
{/*    itemCount={100}*/}
{/*    width={'100%'}*/}
{/*>*/}
{/*    {Row}*/}
{/*</List>*/}
export class FixedSizeList extends React.Component{
    state = {start:0};//起始索引
    constructor() {
        super();
        this.containerRef = React.createRef();
    }
    componentDidMount() {
       this.containerRef.current.addEventListener('scroll', () => {
           let scrollTop = this.containerRef.current.scrollTop;
           let start = Math.floor(scrollTop / this.props.itemSize);//
           console.log(start, 'start');
           this.setState({start})
       })
    }

    render() {
        let {width, height, itemSize, itemCount} = this.props;

        let children = [];
        let pageSize = Math.floor(height / itemSize) + 1;//多显示一条
        let itemStyle = {height:itemSize, width: '100%', position:'absolute', left: 0, top: 0}
        for(let i = this.state.start; i < this.state.start + pageSize; i++) {

            let style = {...itemStyle, top: i * itemSize}
            children.push(this.props.children({index: i, style}))
        }
        let containerStyle = {width,height, position:'relative', overflow: 'auto'};
        return (
            <div style={containerStyle} ref={this.containerRef}>
                <div style={{width:'100%', height: itemSize*itemCount}}>
                    {children}
                </div>
            </div>
        )

    }
}