// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS' // WE NEED THIS TOO
import itemDescription_Transaction from './transactions/itemDescription_Transaction'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction'
import ChangeDate_Transaction from './transactions/ChangeDate_Transaction'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction'
import deleteItem_Transaction from './transactions/DeleteItem_Transaction'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteConfirmationModal from './components/DeleteConfirmationModal'

{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
          highListItemId = toDoListItem.id;
      }
    };

    this.keypressed = false;

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: { items: [] },
      nextListId: highListId + 1,
      nextListItemId: highListItemId + 1,
      useVerboseFeedback: true,
      showModal: false,
      listSelected:false
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      listSelected:true
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId + 1
    }, this.afterToDoListsChangeComplete);
  }


  addNewItem_Transaction = (newItem) => {
    let transaction = new AddNewItem_Transaction(this, newItem);
    this.tps.addTransaction(transaction);
  }

  addNewItem = () => {
    let newItem = this.makeNewToDoListItem();
    this.addNewItem_Transaction(newItem);
  }

  addItemToList = (newItem) => {
    this.state.currentList.items.push(newItem);
    this.setState({
      currentList: this.state.currentList,
      nextListItemId: this.state.nextListItemId + 1
    })
  }

  removeItemFromList = (newItem) => {
    let arrayLocation = this.findArrayLocation(newItem.id);
    this.state.currentList.items.splice(arrayLocation, 1);
    this.setState({
      currentList: this.state.currentList,
      //nextListItemId: this.state.nextListItemId + 1
    })
  }

  makeNewToDoList = () => {
    console.log(this.state.nextListId)
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };

    this.setState({
      nextListId:this.state.nextListId+1
    })

    return newToDoList;
  }

  makeNewToDoListItem = () => {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  //undo Button
  undoTransaction = () => {
    if (this.tps.hasTransactionToUndo()) {
      this.tps.undoTransaction();
    }
  }

  //redoTransaction
  redoTransaction = () => {
    if (this.tps.hasTransactionToRedo()) {
      this.tps.doTransaction();
    }
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }


  //Update Data
  updateItemDesction_transaction = (elementId, oldText, newText) => {
    let transaction = new itemDescription_Transaction(this, elementId, oldText, newText);
    this.tps.addTransaction(transaction);
  }

  updateDescription = (elementId, newText) => {
    let arrayLocation = this.findArrayLocation(elementId);
    this.state.currentList.items[arrayLocation].description = newText;
    this.loadToDoList(this.state.currentList);
  }


  updateDueDate_Transaction = (elementId, newDate) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let oldDate = this.state.currentList.items[arrayLocation].due_date
    console.log(this.state.currentList.items[arrayLocation].due_date);
    console.log(newDate)
    let transaction = new ChangeDate_Transaction(this, elementId, oldDate, newDate);
    this.tps.addTransaction(transaction);
  }

  updateDueDate = (elementId, newDate) => {
    let arrayLocation = this.findArrayLocation(elementId);
    this.state.currentList.items[arrayLocation].due_date = newDate;
    this.loadToDoList(this.state.currentList);
  }

  updateStatus_Transaction = (elementId, newStatus) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let oldStatus = this.state.currentList.items[arrayLocation].status
    let transaction = new ChangeStatus_Transaction(this, elementId, oldStatus, newStatus);
    this.tps.addTransaction(transaction);
  }

  updateStatus = (elementId, newStatus) => {
    let arrayLocation = this.findArrayLocation(elementId);
    this.state.currentList.items[arrayLocation].status = newStatus;
    this.loadToDoList(this.state.currentList);
  }

  moveItemUp_Transaction = (elementId) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let transaction = new MoveItemUp_Transaction(this, elementId);
    this.tps.addTransaction(transaction);
  }

  isFirstItem = (arrayLocation) => {
    //Checks if the item is the first displayed
    if (arrayLocation === 0)
      return true;
    else
      return false;
  }

  isLastItem = (arrayLocation) => {
    //Checks if the item is the first displayed
    if (arrayLocation >= this.state.currentList.items.length - 1)
      return true;
    else
      return false;
  }

  moveItemUp = (elementId) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let currentItems = this.state.currentList.items;
    if (!this.isFirstItem(arrayLocation)) { //If this is not the first item of the list
      //swaps the array locations
      let temp = currentItems[arrayLocation];
      currentItems[arrayLocation] = currentItems[arrayLocation - 1];
      currentItems[arrayLocation - 1] = temp;
    }
    this.state.currentList.items = currentItems;
    
    this.setState({
      currentList: this.state.currentList
    })
    
  }

  moveItemDown_Transaction = (elementId) => { 
    let transaction = new MoveItemDown_Transaction(this, elementId);
    this.tps.addTransaction(transaction);

  }

  moveItemDown = (elementId) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let currentItems = this.state.currentList.items;
    if (!this.isLastItem(arrayLocation)) { //If this is not the Last item of the list
      //swaps the array locations
      let temp = currentItems[arrayLocation];
      currentItems[arrayLocation] = currentItems[arrayLocation + 1];
      currentItems[arrayLocation + 1] = temp;
    }
    this.state.currentList.items = currentItems;

    this.setState({
      currentList: this.state.currentList
    })
  }

  deleteItem_Transaction = (elementId) => {
    let arrayLocation = this.findArrayLocation(elementId);
    let item = this.state.currentList.items[arrayLocation];
    let transaction = new deleteItem_Transaction(this, arrayLocation, item);
    this.tps.addTransaction(transaction);
  }

  addItemToSpecificLocation = (arrayLocation, item) => {
    this.state.currentList.items.splice(arrayLocation, 0, item);
    this.setState({
      currentList: this.state.currentList
    })
  }

  findArrayLocation(elementId) {
    for (let i = 0; i < this.state.currentList.items.length; i++) {
      if (this.state.currentList.items[i].id === elementId) {
        return i;
      }
    }

  }
  //End of Update Data

  editNameOfList = (newListName) => {
    this.state.currentList.name = newListName;
    console.log(this.state.toDoLists)
  }

  
  keydownHandler(e) {
    //control+ c
    if (e.keyCode === 90 && e.ctrlKey && !this.keypressed){
      this.keypressed = true;
      this.undoTransaction();
      this.setState({
        currentList:this.state.currentList
      })
    } 
    else if(e.keyCode === 89 && e.ctrlKey && !this.keypressed) {
      this.keypressed = true;
      this.redoTransaction(); 
      this.setState({
        currentList:this.state.currentList
      })
    } //control + y
  }

  keyupHandler(){
    this.keypressed = false;
  }

  closeListItem=() => {
    this.tps.clearAllTransactions();
    this.setState({
      currentList:{ items: [] },
      listSelected:false
    })
  }

  clearAllTransactions = () => {
    this.tps.clearAllTransactions();
  }

  render() {
    let items = this.state.currentList.items;
    document.addEventListener('keydown', e => this.keydownHandler(e));
    document.addEventListener('keyup', () => this.keyupHandler());
    let undoable = this.tps.hasTransactionToUndo();
    let redoable = this.tps.hasTransactionToRedo();

    
    return (

      <div id="root">
        <Navbar />
        <LeftSidebar
          clearAllTransactions = {this.clearAllTransactions}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          editNameOfList={this.editNameOfList}
        />
        <DeleteConfirmationModal showModal={this.state.showModal} deleteCurrentList={this.deleteCurrentList} showDeleteModal={this.showDeleteModal} />
        <Workspace toDoListItems={items}
          currentList={this.state.currentList}
          undoTransaction={this.undoTransaction}
          undoAble = {undoable}
          redoTransaction={this.redoTransaction}
          redoAble = {redoable}
          isListSelected = {this.state.listSelected}
          closeList = {this.closeListItem}

          moveItemUp_Transaction={this.moveItemUp_Transaction}
          moveItemDown_Transaction={this.moveItemDown_Transaction}
          deleteItem_Transaction={this.deleteItem_Transaction}

          showDeleteModal={this.showDeleteModal}
          deleteCurrentList={this.deleteCurrentList}
          addNewItem={this.addNewItem}

          updateDescription={this.updateDescription}
          updateDescription_transaction={this.updateItemDesction_transaction}

          updateDueDate={this.updateDueDate_Transaction}
          updateStatus={this.updateStatus_Transaction} />

      </div>
    );
  }

  //Button Functions

  showDeleteModal = () => {
    //displays the MODAl
    this.setState({
      showModal: !this.state.showModal
    })

  }

  //Delete Current List
  deleteCurrentList = () => {
    //listId is the id of the list that needs to be deleted
    let listId = this.state.currentList.id
    let modifiedToDoLists = this.state.toDoLists.filter(toDoList => toDoList.id !== listId);
    //Maybe Delete These lines
    this.state.toDoLists = modifiedToDoLists;
    this.state.currentList = { items: [] };
    //Maybe Delete These lines 
    this.tps.clearAllTransactions();
    this.setState({
      toDoLists: modifiedToDoLists,
      currentList: { items: [] },
      showModal: false,
      listSelected:false
    });
  }
}

export default App;