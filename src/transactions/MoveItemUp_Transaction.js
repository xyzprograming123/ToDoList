'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initApp,elementId) {
        super();
        this.app = initApp;
        this.elementId = elementId
    }

    doTransaction() {
        this.app.moveItemUp(this.elementId);
    }

    undoTransaction() {
        this.app.moveItemDown(this.elementId);
    }
}