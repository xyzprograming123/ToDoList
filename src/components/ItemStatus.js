import React, { Component } from 'react'

export default class ItemStatus extends Component {
    constructor(props){
        super(props);
        this.state = {
            notEditing:true
        }
    }
    render() {
        return (
            this.state.notEditing?
            (<div className= {"item-col status-col " + this.props.statusType} onClick = {()=> this.setState({notEditing:false})}>{this.props.status}</div>)
            :(
            <select className={"item-col status-col " + this.props.statusType} 
            value = {this.props.status}
            onBlur = {()=>this.setState({notEditing:true})}
            onChange = {e=> {this.props.updateStatus(parseInt(e.target.parentElement.id.replace("todo-list-item-","")), e.target.value);
            this.setState({notEditing:true})}}>
                <option value = "complete">complete</option>
                <option value = "incomplete">incomplete</option>
            </select>)
        )
    }
}
