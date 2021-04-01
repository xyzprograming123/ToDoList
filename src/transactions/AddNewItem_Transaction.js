'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initApp,newItem) {
        super();
        this.app = initApp;
        this.newItem = newItem
    }

    doTransaction() {
        this.app.addItemToList(this.newItem);
    }

    undoTransaction() {
        this.app.removeItemFromList(this.newItem)
    }
}