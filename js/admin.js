import { products, saveProducts, loadProducts } from './products.js';
import { users, saveUsers, loadUsers } from './users.js';
import { openModal ,closeModal} from './openModal.js';
import { closeCategoryModal, openCategoryModal } from './categoryModal.js';
import { categories, saveCategories } from './categories.js';
import { addCategory, getCategoryById, updateCategory } from './categoryOperations.js';
import { getCartByStatus } from './usersOperations.js';
// import {displayAllProducts} from './productOperations.js'
document.addEventListener('DOMContentLoaded', () => {
  // Load products and users
  const loadedProducts = loadProducts();
  const users = loadUsers();
  displayProducts(loadedProducts);
    const totalProducts= products.length;
    const usersCount=users.length;
    document.getElementById("productsCount").textContent=totalProducts;
    document.getElementById("userCount").textContent=usersCount
  // Display users
//   displayUsers(users);

 
//categoryForm
  function displayProducts(products) {
    var cartona = '';
    products.forEach(product => {
            cartona+=`
              <div class="product">
                <div  class="image">
                    <a href="#detailsBox">
                    <img src=".${product.image?product.image:"../assets/Rectangle26.png"}" alt="${product.name}"></a>
                </div>
                <div class="product_caption">
                    <h4>${product.name}</h4>
                    <span class="price">${product.price}$</span>
                     <div class="buttons_container">
                        <button  class="edit_button" onclick="editProduct(${product.id})">Edit</button>
                        <button class="delete_button" onclick="deleteProduct(${product.id})">Delete</button>
                     </div>
                    </div>
            </div>
            `
      document.getElementById("prodId").innerHTML=cartona
    });
  }
  document.getElementById("totalPosts").addEventListener('click',function(){
    displayProducts(products);
})

  function displayUsers(users) {
    console.log(users);
        var cartona='';
    users.forEach(user => {
      cartona += `
        <div class="user-box">
        <span style="text-align:center;">id: ${user.id}</span>
        <h3>Name: ${user.fullName}</h3>
        <p>email: ${user?.email} items</p>
        <p>Cart: ${user?.cart?.length} items</p>
        <p>Wishlist: ${user?.wishList?.length} items</p>
         <div class="buttons_container">
             <button class="delete_button" onclick="deleteUser(${user.id})">Delete</button>
        </div>
        </div>
      `;
      
    });
    document.getElementById("prodId").innerHTML=cartona;
  }
  document.getElementById("userList").addEventListener('click', function(){
    displayUsers(users)
  })
//   Add Product Function
document.getElementById("addProduct").addEventListener('click', function(){
    openModal()
    clearForm()
})
 
function handleProductFormSubmit(event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    if (productId) {
        console.log("prod id", productId);
        console.log("update mode");

      // Edit product
      const productIndex = products.findIndex(product => product.id == productId);
      products[productIndex] = {
        id: parseInt(productId),
        name: productName,
        category: productCategory,
        price: parseFloat(productPrice),
        image: productImage,
      };

    } else {
        console.log("add new mode");
      // Add new product
      const newProduct = {
        id: generateUniqueId(products),
        name: productName,
        category: productCategory,
        price: parseFloat(productPrice),
        image: productImage,
      };
      products.push(newProduct);
    }

    saveProducts(products);
    displayProducts(products);
    clearForm()
    closeModal();
  }
// function to clear the form
function clearForm() {
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';
  }
  const productForm = document.getElementById('productForm');
  productForm.addEventListener('submit', handleProductFormSubmit);

  window.editProduct = function(productId) {
    openModal();
    const product = products.find(product => product.id === productId);
    console.log("from edit",product);

    if (product) {
      document.getElementById('productId').value = product.id;
      document.getElementById('productName').value = product.name;
      document.getElementById('productCategory').value = product.category;
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productImage').value = product.image;
    }
  };

  window.deleteProduct = function(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      const productIndex = products.findIndex(product => product.id === productId);
      if (productIndex > -1) {
        products.splice(productIndex, 1);
        saveProducts(products);
        displayProducts(products);
      }
    }
  };

  function generateUniqueId(products) {
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }
});
// edit user function

// delete user function
window.deleteUser = function(userId) {
    console.log(userId);
    if (confirm("Are you sure you want to delete this user?")) {
      const userIndex = users.findIndex(user => user.id === userId);
      if (userIndex > -1) {
        users.splice(userIndex, 1);
        saveUsers(users);
        displayUsers(users);
      }
    }
  };

// handle category operations
function clearCategoryForm() {
    document.getElementById('categoryId').value = '';
    document.getElementById('categoryName').value = '';
}

// Function to handle editing category


// Function to handle deleting category
window.deleteCategory = function(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
        const categoryIndex = categories.findIndex(category => category.id === categoryId);
        if (categoryIndex > -1) {
            categories.splice(categoryIndex, 1);
            saveCategories(); // Save categories after deletion
            displayCategoriesAdmin(categories); // Refresh the list
        }
    }
}

function handleCategoryFormSubmit(event) {

    event.preventDefault();
    const categoryId = document.getElementById('categoryId').value;
    const categoryName = document.getElementById('categoryName').value;
    
    try {
        if (categoryId) {
            updateCategory(parseInt(categoryId), categoryName);
        } else {
            addCategory(categoryName);
        }
        displayCategoriesAdmin(categories);
        clearCategoryForm();
        closeCategoryModal()
    } catch (error) {
        alert(error.message);
    }
}



window.editCategory = function (categoryId) {
    openCategoryModal()
    const category = getCategoryById(categoryId);
    if (category) {
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryName').value = category.name;
    }
}

const categoryForm = document.getElementById('categoryForm');
 categoryForm.addEventListener('submit', handleCategoryFormSubmit);

document.getElementById("addCategoryBtn").addEventListener('click', () => {
    openCategoryModal();
});
function displayCategoriesAdmin(categories) {
    
    var cartona = ''; // Clear the list

    categories.forEach(category => {
      cartona  += `
           <div class="user-box">
            <span>${category.name}</span>
            <div class="buttons_container">
            <button class="edit_button" onclick="editCategory(${category.id})">Edit</button>
            <button  class="delete_button" onclick="deleteCategory(${category.id})">Delete</button>
            </div>
            </div>
        `;
        document.getElementById("prodId").innerHTML=cartona;
    });
}
document.getElementById("categoryList").addEventListener('click',function(){
    displayCategoriesAdmin(categories);
})

// handle pending orders
// window.getCartByStatus=function (userId, "available"){
//     console.log(userId,"available");
// }
// getCartByStatus()
const currentUserId=localStorage.getItem("loggedUser")
const pendingOrders = getCartByStatus(JSON.parse(currentUserId).id, 'pending');

function renderPendingOrders(pendingOrders) {
    let cartona = ''; // Clear previous orders

    pendingOrders.forEach(order => {
        cartona += `
          <div class="user-box">
            <div>Order ID: ${order.id}</div>
            <div>Product: ${order.name}</div>
            <div>Price: ${order.price}</div>
            <div>Status: ${order.status}</div>
            <div class="buttons_container">
            <button  class="edit_button"  onclick="confirmOrder(${order.id})">Confirm</button>
            <button class="delete_button" onclick="rejectOrder(${order.id})">Reject</button>
            </div>
            </div>
        `;
        document.getElementById("prodId").innerHTML=cartona;
    });
}

// Call the function to render pending orders
document.getElementById("pendingOrders").addEventListener('click',function(){
    renderPendingOrders(pendingOrders);
})

