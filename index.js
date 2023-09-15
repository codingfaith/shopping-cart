import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://personal-shopping-carty-default-rtdb.firebaseio.com/"
}
//link to database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

//add new item to database
if(addButtonEl){
    addButtonEl.addEventListener("click", function() {
        let inputValue = inputFieldEl.value
        push(shoppingListInDB, inputValue)
        clearInputFieldEl()
    })

    //if table exists and is not empty, add table contents to links
    onValue(shoppingListInDB, function(snapshot) {
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
            clearShoppingListEl()
            for(let currentItem of itemsArray){
                if(currentItem[1]!=""){
                    appendItemToShoppingListEl(currentItem)
                }
            }
        } else {
            shoppingListEl.innerHTML = "No items here... yet"
        }
    })
}

//remove everything first before reload to avoid duplicates
function clearShoppingListEl() {
    if(shoppingListEl){
        shoppingListEl.innerHTML = ""
    }   
}
//clear input field once item is added to list
function clearInputFieldEl() {
    if(inputFieldEl){
        inputFieldEl.value = ""
    }
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]  
    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    newEl.addEventListener("click", function() {
        newEl.classList.toggle("strike")
    })

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}

//for the toDo List
const toDoListInDB = ref(database, "toDoList")
const inputToDoEl = document.getElementById("input-toDo")
const addToDoEl = document.getElementById("add-toDo")
const toDoListEl = document.getElementById("toDo-list")

//add new item to database
if(addToDoEl){
    addToDoEl.addEventListener("click", function() {
        let inputValue = inputToDoEl.value
        push(toDoListInDB, inputValue)
        clearInputToDoEl()
    })
    //if table exists and is not empty, add table contents to links
    onValue(toDoListInDB, function(snapshot) {
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
            cleartoDoListEl()
            for(let currentItem of itemsArray){
                if(currentItem[1]!=""){
                    appendItemTotoDoListEl(currentItem)
                }
            }
        } else {
            toDoListEl.innerHTML = "No items here... yet"
        }
    })
}

//remove everything first before reload to avoid duplicates
function cleartoDoListEl() {
    if(toDoListEl){
        toDoListEl.innerHTML = ""
    }  
}
//clear input field once item is added to list
function clearInputToDoEl() {
    if(inputToDoEl){
        inputToDoEl.value = ""
    }  
}

function appendItemTotoDoListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]  
    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    toDoListEl.append(newEl)

    newEl.addEventListener("click", function() {
        newEl.classList.toggle("strike")
    })

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `toDoList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}
