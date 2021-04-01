import React, { Component } from 'react'

export default class DeleteConfirmationModal extends Component {
    render() {
        if(!this.props.showModal){
            return null;
        }
        return (
            <div id="comfirmDeleteModal" class="modal">
                <div class="modal-content">
                    <span class="close" onClick={()=>this.props.showDeleteModal()}>&times;</span>
                    <p>Delete List?</p>
                    <div class="dotted-line"></div>
                    <div>
                        <button id="modal-comfirm-button" onClick = {()=>this.props.deleteCurrentList()}>Comfirm</button>
                        <button id="modal-cancel-button" onClick = {()=>this.props.showDeleteModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}
