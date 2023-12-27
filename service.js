const searchTable = document.getElementById("searchTable");
const searchMenu = document.getElementById("searchMenu");
const tableList = document.getElementsByClassName("table-item");
var menuList;
const loadData = async () => {
  try {
    const res = await fetch("database.json");
    if (res) {
      menuList = await res.json();
      displayMenuItems(menuList);
    }
  } catch (error) {
    alert("error occured while fetching data");
  }
};

function displayMenuItems(elements) {
  menuList = elements;
  let count = 1;
  const menuContainer = document.querySelector(".menu-container");
  const ulList = document.createElement("ul");
  // Loop through the elements and create list of menu items
  elements.forEach((element) => {
    const list = document.createElement("li");
    list.classList.add("menu-item");
    list.id = count++;
    const divName = document.createElement("div");
    divName.textContent = element.name;
    divName.classList.add("menu-name");
    const divPrice = document.createElement("div");
    divPrice.textContent = `Rs. ${element.price}`;
    divPrice.classList.add("menu-price");
    const divType = document.createElement("div");
    divType.textContent = `Rs. ${element.type}`;
    divType.classList.add("menu-type");
    list.setAttribute("draggable", "true");
    list.setAttribute("cursor", "pointer");
    list.setAttribute("data-price", element.price);
    list.append(divName);
    list.append(divPrice);
    list.append(divType);
    ulList.appendChild(list);
  });
  menuContainer.appendChild(ulList);
}

window.addEventListener("load", loadData);

searchTable.addEventListener("input", () => {
  let searchTerm = searchTable.value.toLowerCase();
  for (let i = 0; i < tableList.length; i++) {
    const itemText = tableList[i].textContent.toLowerCase();
    const item = tableList[i];
    // Check if the item matches the search term
    if (itemText.includes(searchTerm)) {
      item.style.display = ""; // Show the item
    } else {
      item.style.display = "none"; // Hide the item
    }
  }
});

searchMenu.addEventListener("input", () => {
  const menuList = document.getElementsByClassName("menu-item");
  let searchTerm = searchMenu.value.toLowerCase();
  for (let i = 0; i < menuList.length; i++) {
    const itemText = menuList[i].textContent.toLowerCase();
    const item = menuList[i];
    // Check if the item matches the search term
    if (itemText.includes(searchTerm)) {
      item.style.display = ""; // Show the item
    } else {
      item.style.display = "none"; // Hide the item
    }
  }
});

function handleDragStart(event) {
  const itemId = event.target.id;
  event.dataTransfer.setData("text/plain", itemId);
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

var order1 = new Array();
var order2 = new Array();
var order3 = new Array();
var modal = document.getElementById("myModal");

function handleDrop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text/plain");
  const menuItem = document.getElementById(itemId);
  const table = event.currentTarget;
  const itemCountElement = table.querySelector(".item");
  const totalPriceElement = table.querySelector(".amt");

  const itemsCount = parseInt(table.getAttribute("data-items")) || 0;
  table.setAttribute("data-items", itemsCount + 1);

  const itemPrice = parseInt(menuItem.getAttribute("data-price")) || 0;
  const totalPrice = parseInt(table.getAttribute("data-price")) || 0;
  table.setAttribute("data-price", totalPrice + itemPrice + ".00");

  itemCountElement.textContent = itemsCount + 1;
  totalPriceElement.textContent = totalPrice + itemPrice;

  if (table.id === "table-1") {
    addItemToOrder(order1, menuList[itemId - 1]);
    //order1.push(menuList[itemId - 1]);
  } else if (table.id === "table-2") {
    addItemToOrder(order2, menuList[itemId - 1]);
  } else if (table.id === "table-3") {
    addItemToOrder(order3, menuList[itemId - 1]);
  }
}

function addItemToOrder(order, menuItem) {
  if (order.includes(menuItem)) {
    menuItem.quantity = menuItem.quantity + 1;
  } else {
    menuItem.quantity = 1;
    order.push(menuItem);
  }
}

function onClickEvent(tableId) {
  modal.style.display = "block";
  const tableName = document.getElementById("table-id");
  if (tableId === "table-1") {
    tableName.innerHTML = "Table - 1";
    createTable(order1, tableId);
  } else if (tableId === "table-2") {
    tableName.innerHTML = "Table - 2";
    createTable(order2, tableId);
  } else if (tableId === "table-3") {
    tableName.innerHTML = "Table - 3";
    createTable(order3, tableId);
  }
}

function closeModal() {
  var tableElements = Array.from(
    document.getElementsByClassName("table-content")
  );
  tableElements.forEach((ele) => {
    ele.remove();
  });
  modal.style.display = "none";
}

function createTable(orders, tableId) {
  let i = 0;
  orders.forEach((order) => {
    i++;
    const tr = document.createElement("tr");
    const tdSno = document.createElement("td");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdItems = document.createElement("td");
    const incrementer = document.createElement("input");
    incrementer.type = "number";
    incrementer.value = parseInt(order.quantity);
    incrementer.id = "counter-id-" + i;
    incrementer.classList.add("counter");
    incrementer.setAttribute("menu-id", order.id);
    incrementer.setAttribute("min", "1");
    incrementer.setAttribute("cursor", "pointer");
    const tdDelete = document.createElement("td");
    tdDelete.innerHTML = "&#xe872;";
    tdDelete.classList.add("material-icons");
    tdDelete.classList.add("delete-item");
    tdDelete.id = "delete-item-" + order.id;
    tdDelete.setAttribute("menu-id", order.id);
    tdSno.textContent = i + ".";
    tdName.textContent = order.name;
    tdPrice.textContent = parseInt(order.price) + ".00";
    tdItems.appendChild(incrementer);
    tr.append(tdSno);
    tr.append(tdName);
    tr.append(tdPrice);
    tr.append(tdItems);
    tr.append(tdDelete);
    tr.setAttribute("class", "table-content");
    tr.id = "menu-item-" + order.id;
    document.querySelector("table").append(tr);
  });
  const table = document.getElementById(tableId);
  const tr = document.createElement("tr");
  const tdSno = document.createElement("td");
  const tdName = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdItems = document.createElement("td");
  const tdDelete = document.createElement("td");
  tdSno.textContent = null;
  tdName.textContent = null;
  tdPrice.textContent =
    "Total : " + parseInt(table.getAttribute("data-price")) + ".00";
  tdPrice.id = "table-total-price";
  tdItems.textContent = null;
  tdDelete.textContent = null;
  tr.append(tdSno);
  tr.append(tdName);
  tr.append(tdPrice);
  tr.append(tdItems);
  tr.append(tdDelete);
  tr.setAttribute("class", "table-content");
  document.querySelector("table").append(tr);
  document.querySelector("#bill-generate").onclick = () => {
    let totalPrice = table.getAttribute("data-price");
    alert(`please pay bill for order: ${totalPrice}`);
    deleteOrder(orders, table);
  };
  const counter = Array.from(document.getElementsByClassName("counter"));
  counter.forEach((c) => {
    c.addEventListener("change", function () {
      const menuId = parseInt(c.getAttribute("menu-id"));
      updateItem(table, orders, menuId, c.value);
    });
  });
  const deleteElements = Array.from(
    document.getElementsByClassName("delete-item")
  );
  deleteElements.forEach((delElement) => {
    delElement.onclick = (event) => {
      const deleteElement = event.target;
      let menuId = parseInt(deleteElement.getAttribute("menu-id"));
      deleteItem(table, orders, menuId);
    };
  });
}

function deleteOrder(orders, table) {
  orders.length = 0;
  const itemCountElement = table.querySelector(".item");
  const totalPriceElement = table.querySelector(".amt");
  table.setAttribute("data-items", 0);
  table.setAttribute("data-price", 0.0);
  itemCountElement.textContent = 0;
  totalPriceElement.textContent = 0.0;
  closeModal();
}

function updateItem(table, orders, menuId, quantity) {
  orders.forEach((order) => {
    if (order.id === menuId) {
      order.quantity = quantity;
    }
  });
  updateOrderDetails(orders, table);
}

function updateOrderDetails(orders, table) {
  const itemCountElement = table.querySelector(".item");
  const totalPriceElement = table.querySelector(".amt");
  const totalTablePrice = document.getElementById("table-total-price");
  let price = 0;
  let quantity = 0;
  orders.forEach((order) => {
    quantity = quantity + parseInt(order.quantity);
    price = price + order.price * parseInt(order.quantity);
  });
  table.setAttribute("data-items", quantity);
  table.setAttribute("data-price", price + ".00");
  itemCountElement.textContent = quantity;
  totalPriceElement.textContent = price + ".00";
  totalTablePrice.textContent = "Total : " + price + ".00";
}

function deleteItem(table, orders, menuId) {
  let newOrder = new Array();
  const itemCountElement = table.querySelector(".item");
  const totalPriceElement = table.querySelector(".amt");
  const totalTablePrice = document.getElementById("table-total-price");
  let originalPrice = parseInt(table.getAttribute("data-price"));
  let originalQuantity = parseInt(table.getAttribute("data-items"));
  let price;
  let quantity;
  orders.forEach((order) => {
    if (order.id !== menuId) {
      newOrder.push(order);
    } else {
      price = order.price;
      quantity = order.quantity;
    }
  });
  orders = newOrder;
  let updatedQuantity = originalQuantity - quantity;
  let updatedPrice = originalPrice - price * quantity;
  table.setAttribute("data-items", updatedQuantity);
  table.setAttribute("data-price", updatedPrice + ".00");
  itemCountElement.textContent = updatedQuantity;
  totalPriceElement.textContent = updatedPrice + ".00";
  totalTablePrice.textContent = "Total : " + updatedPrice + ".00";
  var tableElements = Array.from(
    document.getElementsByClassName("table-content")
  );
  tableElements.forEach((ele) => {
    ele.remove();
  });
  setNewOrder(table.id, newOrder);
}

function setNewOrder(tableId, newOrder) {
  if (tableId === "table-1") {
    order1 = newOrder;
    createTable(order1, tableId);
  } else if (tableId === "table-2") {
    order2 = newOrder;
    createTable(order2, tableId);
  } else if (tableId === "table-3") {
    order3 = newOrder;
    createTable(order3, tableId);
  }
}
