// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);

        this.oldText = ""
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = (e) => {
        this.props.clearAllTransactions();
        this.props.loadToDoListCallback(this.props.toDoList);
        this.oldText = e.target.innerText
    }

    handleNameChange = (e) => {
        if (this.oldText !== e.target.innerText) {
            this.props.editNameOfList(e.target.innerText);
        }

        this.oldText = "";
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div
                suppressContentEditableWarning={true}
                className='todo-list-button'
                onClick={e => this.handleLoadList(e)}
                contentEditable="true"
                onBlur={e => this.handleNameChange(e)}
            >
                {this.props.toDoList.name}<br />
            </div>
        )
    }
}

export default ListLink;