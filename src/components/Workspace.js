// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import { IndeterminateCheckBoxRounded } from '@material-ui/icons';

class Workspace extends Component {
    constructor(props) {
        super(props);

    }




    render() {
        let undoAble = this.props.undoAble;
        let redoAble = this.props.redoAble;
        let listSelected = this.props.isListSelected;
        let lastElementIndex = this.props.toDoListItems.length-1;
        
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button"
                            onClick={() => this.props.undoTransaction()}
                            style={undoAble ? {} : { pointerEvents: "none", opacity: "0.4" }}
                        />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button"
                            onClick={() => this.props.redoTransaction()}
                            style={redoAble ? {} : { pointerEvents: "none", opacity: "0.4" }}
                        />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button"
                            onClick={() => this.props.addNewItem()}
                            style={listSelected ? {} : { pointerEvents: "none", opacity: "0.4" }} />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button"
                            onClick={() => this.props.showDeleteModal()}
                            style={listSelected ? {} : { pointerEvents: "none", opacity: "0.4" }} />
                        <Close id="close-list-button" className="list-item-control material-icons todo-button"
                            onClick={()=> this.props.closeList()}
                            style={listSelected ? {} : { pointerEvents: "none", opacity: "0.4" }} />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {   
                        this.props.toDoListItems.map((toDoListItem,index) =>(
                        <ToDoItem
                                key={toDoListItem.id}
                                index ={index}
                                lastElementIndex = {lastElementIndex}
                                toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                                updateDescription={this.props.updateDescription}
                                updateDescription_transaction={this.props.updateDescription_transaction}
                                updateDueDate={this.props.updateDueDate}
                                updateStatus={this.props.updateStatus}
                                moveItemUp_Transaction={this.props.moveItemUp_Transaction}
                                moveItemDown_Transaction={this.props.moveItemDown_Transaction}
                                deleteItem_Transaction={this.props.deleteItem_Transaction}
                            />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;