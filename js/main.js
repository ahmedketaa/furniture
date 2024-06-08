// main.js
import { getProductById, getLatestProducts, filterProductsByCategory } from './productOperations.js';
import { addToCart , addToWishList } from './usersOperations.js';
import { products } from './products.js';

const userId = 1; // Assume a logged-in user with ID 1

// Declare addToWishlist function in the global scope
window.addToWishlist = function(productId) {
    addToWishList(userId, productId);
}

window.displayProductDetails =  function displayProductDetails(productId) {
    // Find the product by its ID
    const product = getProductById(productId);

    // Check if the product exists
    if (product) {
        // Construct the HTML for displaying product details
        const detailsHTML = `
           <div class="details_container">
           <h2>${product.name}</h2>
           <p><strong>Category:</strong> ${product.category}</p>
           <p><strong>Price:</strong> ${product.price}$</p>
           <img src="${product.image}" alt="${product.name}">
            <div>
            <button class="add-to-cart" >Add to Cart</button>
            <button class="add-to-wishlist"  onclick="addToWishlist(${product.id}, ${product.id})"><i class="far fa-heart"></i></button>
       
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
    const categoryInput = document.getElementById('category');
   
    // Function to render products
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        let cartona = '';
    
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            cartona += `
            <div class="product">
                <div onClick="displayProductDetails(${product.id})" class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product_caption">
                    <h4>${product.name}</h4>
                    <span class="price">${product.price}$</span>
                    
                    <div class="buttons_container">
                    <button class="add-to-cart" >Add to Cart</button>
                    <button class="add-to-wishlist"  onclick="addToWishlist(${product.id}, ${product.id})"><i class="far fa-heart"></i></button>
                   
                     </div>
                    </div>
            </div>
            `;
        }
    //  <button class="product-details"  onClick="displayProductDetails(${product.id})">Product Details</button>

        productsContainer.innerHTML = cartona;
    
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.getAttribute('data-id'));
                const product = getProductById(productId);
                addToCart(userId, product);
                alert('Product added to cart!');
            });
        });
    }
    
    // Function to display latest products
    function displayLatestProducts() {
        const latestProducts = getLatestProducts();
        renderProducts(latestProducts);
    }

    // Event listener for category filter
    categoryInput.addEventListener('change', (event) => {
        const category = event.target.value;
        const filteredProducts = filterProductsByCategory(category);
        renderProducts(filteredProducts);
    });

    // Initial render
    function displayAllProducts() {
        renderProducts(products);
    }
    displayAllProducts();
});
