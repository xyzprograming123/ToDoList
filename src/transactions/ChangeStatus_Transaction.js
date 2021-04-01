'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initApp,id,oldStatus,newStatus) {
        super();
        this.app = initApp;
        this.id = id;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
    }

    doTransaction() {
        this.app.updateStatus(this.id,this.newStatus);
    }

    undoTransaction() {
        this.app.updateStatus(this.id,this.oldStatus)
    }
}