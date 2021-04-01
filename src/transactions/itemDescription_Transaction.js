'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "./../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class itemDescription_Transaction extends jsTPS_Transaction {
    constructor(initApp,id,oldText,newText) {
        super();
        this.app = initApp;
        this.oldText = oldText;
        this.newText = newText;
        this.id = id;
    }

    doTransaction() {
        
        this.app.updateDescription(this.id,this.newText);
    }

    undoTransaction() {
    
        this.app.updateDescription(this.id,this.oldText)
    }
}