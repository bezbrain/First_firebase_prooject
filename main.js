import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://practice-d2bb4-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const practiceInDB = ref(database, "practice");

const input = document.querySelector("input");
const addBtn = document.getElementById("add-btn");
const itemsAdded = document.querySelector(".items-added");

addBtn.onclick = () => {
  let inputValue = input.value;
  if (!inputValue) {
    console.log(" I cannot be empty");
  } else {
    push(practiceInDB, inputValue);
    input.value = "";
  }
};

onValue(practiceInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    itemsAdded.innerHTML = "";
    itemsArray.forEach((each, i) => {
      let currItem = each;
      let currItemID = each[0];
      let currItemValue = each[1];
      appendItems(currItem);
    });
  } else {
    itemsAdded.innerHTML = "No item found";
  }
});

const appendItems = (item) => {
  let itemID = item[0];
  let itemValue = item[1];

  const displayItems = document.createElement("p");
  displayItems.textContent = itemValue;
  itemsAdded.appendChild(displayItems);
  removeItem(displayItems, itemID);
};

const removeItem = (item, id) => {
  item.onclick = () => {
    console.log(item);
    let removeItem = ref(database, `practice/${id}`);
    remove(removeItem);
  };
};
