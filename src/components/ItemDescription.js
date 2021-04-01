import React, { Component } from "react";

export class ItemDescription extends Component{
    constructor(props){
        super(props);
        this.oldText = "";
        this.newText = "";
        this.state= {
            notEditing:true,
        }
    }

    handleUpdate=(e)=>{
        this.newText = e.target.value;
        if(this.newText !== this.oldText){
        this.props.updateDescription(parseInt(e.target.parentElement.id.replace("todo-list-item-","")), this.newText);
        this.props.updateDescription_transaction(parseInt(e.target.parentElement.id.replace("todo-list-item-","")),this.oldText, this.newText);
        }
        this.setState({
            notEditing:true,
        })
    }

    render(){
        //Sents the event back to the thing
        return(
                this.state.notEditing?
                (<div className='item-col task-col' onClick = {()=> this.setState({notEditing:false})}>{this.props.description}</div>):
                (<input
                defaultValue = {this.props.description}
                onClick = {e => this.oldText = e.target.value} 
                onBlur={e=> this.handleUpdate(e)}
                className='item-col task-col'/>
                )
                    
        )
    }
    
}



export default ItemDescription;