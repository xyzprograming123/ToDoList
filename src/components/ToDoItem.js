// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import ItemDescription from './ItemDescription';
import ItemDueDate from './ItemDueDate';
import ItemStatus from './ItemStatus';
import { ListItemAvatar } from '@material-ui/core';


class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        let isFirstElement = false;
        let isLastElement = false;
        if(this.props.index === 0)
            isFirstElement = true;

        if(this.props.index === this.props.lastElementIndex)
            isLastElement = true;

        this.state = {
            firstElement:isFirstElement,
            lastElement:isLastElement
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleMoveUp = () =>{
        this.props.moveItemUp_Transaction(this.props.toDoListItem.id);
    }

    handleMoveDown = () =>{
        this.props.moveItemDown_Transaction(this.props.toDoListItem.id);
    }

    handleDeleteItem = () =>{
        this.props.deleteItem_Transaction(this.props.toDoListItem.id);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        //this.editing = {isEditing:false};
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
            
        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card list-item-only'>
                <ItemDescription description = {listItem.description} updateDescription = {this.props.updateDescription} updateDescription_transaction = {this.props.updateDescription_transaction}/>
                <ItemDueDate dueDate = {listItem.due_date} updateDueDate = {this.props.updateDueDate}/>
                <ItemStatus statusType = {statusType} status = {listItem.status} updateStatus = {this.props.updateStatus}/>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' 
                    onClick = {() => this.handleMoveUp()}
                    />
                    <KeyboardArrowDown className='list-item-control todo-button' 
                    onClick = {() => this.handleMoveDown()}
                    />
                    <Close className='list-item-control todo-button' 
                    onClick = {() => this.handleDeleteItem()}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;