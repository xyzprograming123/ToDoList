'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initApp, arrayLocation, newItem) {
        super();
        this.app = initApp;
        this.arrayLocation = arrayLocation;
        this.itemToDelete = newItem;
    }

    doTransaction() {
        this.app.removeItemFromList(this.itemToDelete);
    }

    undoTransaction() {
        this.app.addItemToSpecificLocation(this.arrayLocation, this.itemToDelete)
    }
}