let nameInput = document.getElementById("pro-name"),
priceInput = document.getElementById("pro-price"),
categoryInput = document.getElementById("pro-category"),
descriptionInput = document.getElementById("pro-description"),
container = document.querySelector(".myItems"),
searchBar = document.getElementById("search"),
addBtn = document.getElementById("add");

var itemList = [];
if (localStorage.getItem("item")){
  itemList = JSON.parse(localStorage.getItem("item"));
  itemList.forEach(e => {
    render(e)
  });
}

addBtn.addEventListener("click",() => {
  addProduct();
  clearInputs();
});

// delete and Update Button
container.addEventListener("click", (e) => {
  if(e.target.classList.contains("delete")){
    deleteItem(e.target.parentElement.parentElement)
  }else if(e.target.classList.contains("update")){
    for (let i = 0; i < itemList.length; i++){
      if(itemList[i].ip == e.target.parentElement.parentElement.getAttribute("data-ip")){
        nameInput.value = `${itemList[i].name}`
        priceInput.value = `${itemList[i].price}`
        categoryInput.value = `${itemList[i].category}`
        descriptionInput.value = `${itemList[i].description}`
        deleteItem(e.target.parentElement.parentElement)
      }
    } 
  }
})

searchBar.addEventListener("keyup", (eventInfo) => {
  search();
})



function search(){
  container.innerHTML = ""
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].name.toLowerCase().includes(searchBar.value.toLowerCase()) == true) {
      render(itemList[i])
    } 
  }
}

function addProduct () {
  if(checkInputs() == true){
    var product = {
      ip: Date.now(),
      name: nameInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      description: descriptionInput.value
    }
    itemList.push(product);
    render(product);
    localStorage.setItem("item", JSON.stringify(itemList));
  }else {
    swal.fire("All Fields are Required")
  }
};

function render(product) {
  let item = document.createElement("ul");
  item.className = 'item'
  item.setAttribute("data-ip", product.ip)
  item.innerHTML = `
  <li>${product.name}</li>
  <li>${product.price}</li>
  <li>${product.category}</li>
  <li>${product.description}</li>
  <li><button class="update">Update</button></li>
  <li><button class="delete">Delete</button></li>`;
  container.appendChild(item);
}

function deleteItem(element){
  element.remove()
  itemList = itemList.filter((item) => item.ip != element.getAttribute("data-ip"));
  localStorage.setItem("item", JSON.stringify(itemList))
}

function checkInputs () {
  if(nameInput.value != '' && priceInput.value != '' && categoryInput.value != '' && descriptionInput.value != ''){
    return true
  }
}

function clearInputs(){
  nameInput.value = ""
  priceInput.value =""
  categoryInput.value =""
  descriptionInput.value =""
};

