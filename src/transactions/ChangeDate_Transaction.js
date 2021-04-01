'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initApp,id,oldDate,newDate) {
        super();
        this.app = initApp;
        this.id = id;
        this.oldDate = oldDate;
        this.newDate = newDate;
    }

    doTransaction() {
        this.app.updateDueDate(this.id,this.newDate);
    }

    undoTransaction() {
        this.app.updateDueDate(this.id,this.oldDate)
    }
}