import React, { Component } from 'react'

export default class ItemDueDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            notEditing:true
        }
    }
    render() {
        return (
            this.state.notEditing?(<div className='item-col due-date-col' onClick = {()=>this.setState({notEditing:false})}>{this.props.dueDate}</div>):(
            <input className='item-col due-date-col' 
            type='date'
            onChange = {e=>{this.props.updateDueDate(parseInt(e.target.parentElement.id.replace("todo-list-item-","")), e.target.value);
            this.setState({notEditing:true})}}
            disabled = {false}
            onBlur ={()=>this.setState({notEditing:true})}
            value = {this.props.dueDate}/>)
        )
    }
}
