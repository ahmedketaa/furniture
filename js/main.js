// main.js
import { getProductById, getLatestProducts, filterProductsByCategory ,filterProductsBySearch} from './productOperations.js';
import { addToCart , addToWishList , isInWishlist , removeFromWishList , isInCart, removeFromCart } from './usersOperations.js';
import { products } from './products.js';
import { saveProducts } from './products.js';
import { saveUsers } from './users.js';

const userId = 1; 

// Declare addToWishlist function in the global scope
window.addToWishlist = function(userId,productId) {
    console.log(productId);
    if (isInWishlist(userId, productId)) {
        removeFromWishList(userId, productId);
    } else {
        addToWishList(userId, productId);
    }
    displayAllProducts();

}


window.displayProductDetails =  function displayProductDetails(productId) {
    // Find the product by its ID
    const product = getProductById(productId);

    // Check if the product exists
    if (product) {
        const detailsHTML = `
           <div class="details_container">
           <h2>${product.name}</h2>
           <img src="${product.image}" alt="${product.name}">
           
            
            <div class="product_category">
           <p><strong>Category:</strong></p><span> ${product.category}</span>
           </div>
           <div class="product_price">
           <p><strong>Price:</strong> </p><span>${product.price}$</span>
           </div>
           <div class="product_desc">
            <p class="">Description:</p><span>${product.description} </span>
            </div>
           </div>
            `;
        const productDetails = document.querySelector('.product_details');
        productDetails.innerHTML = detailsHTML;
    } else {
        // Product not found, display an error message or handle accordingly
        const productDetails = document.querySelector('.product_details');
        productDetails.innerHTML = "<p>Product details not available.</p>";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products_container');
   
    // Function to render products
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        let cartona = '';
        
    
        for (let i = 0; i < products.length; i++) {
            cartona += `
            <div class="product">
                <div onClick="displayProductDetails(${products[i].id})" class="image">
                   
                    <a href="#detailsBox">
                    <img src="${products[i].image}" alt="${products[i].name}"></a>
                </div>
                <div class="products[i]_caption">
                    <h4>${products[i].name}</h4>
                    <span class="price">${products[i].price}$</span>
                    
                    <div class="buttons_container">
                    <button class="add-to-cart ${isInCart(userId, products[i].id)?" clicked_button ":" "} " >${isInCart(userId, products[i].id)?"Remove From Cart": "Add To Cart"}</button>
                    <i onclick="addToWishlist(${userId}, ${products[i].id})" class="${isInWishlist(userId,products[i].id)?"fas":"far"} fa-heart add-to-wishlist"></i>
                   
                     </div>
                    </div>
            </div>
            `;
        }

        productsContainer.innerHTML = cartona;
        setTimeout(() => {
            document.querySelectorAll('.product').forEach((product, index) => {
                setTimeout(() => product.classList.add('visible'), 100 * index);
            });
        }, 10);
    
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach((button, index) => {
            button.addEventListener('click', () => {
                const productId = products[index].id; 
                console.log("tes", productId);
                console.log('Product ID:', productId);
        
                if (isInCart(userId, productId)) {
                    removeFromCart(userId, productId);
                    button.textContent = 'Add to Cart';
                    button.style.backgroundColor="white"
                    button.style.color="black"
                   saveUsers();
                   saveProducts();
                } else {
                    addToCart(userId, productId); // Debugging: Check if addToCart is called
                    console.log('Added to cart');
                    console.log(isInCart(userId, productId));

                    button.textContent = 'Remove from Cart';
                    button.style.backgroundColor="#b68d50"
                    button.style.color="white"
                    saveProducts(); // Debugging: Check if saveProducts is called
                }
            });
        });
        
    }

    
    // Function to display latest products
    function displayLatestProducts() {
        const latestProducts = getLatestProducts();
        renderProducts(latestProducts);
    }

    // Event listener for category filter
    document.getElementById('category').addEventListener('change', (event) => {
        const category = event.target.value;
        const searchTerm = document.getElementById('search').value;
        const filteredProducts = filterProductsBySearch(searchTerm).filter(product => category === "" || product.category === category);
        renderProducts(filteredProducts);
    });
  });
  

    document.getElementById('search').addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        const category = document.getElementById('category').value;
        const filteredProducts = filterProductsBySearch(searchTerm).filter(product => category === "" || product.category === category);
        renderProducts(filteredProducts);
    });
    // Initial render
    window.displayAllProducts = function displayAllProducts() {
        renderProducts(products);
    }
    displayAllProducts();
});
