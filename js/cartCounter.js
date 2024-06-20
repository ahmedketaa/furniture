// cart.js

import { users } from "./users.js";
import { removeFromCart, updateQuantityInCart, placeOrder, removeFromWishList } from "./usersOperations.js"

    const subtotalDisplay = document.getElementById('subtotal');
    const totalDisplay = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');
    const cartTable = document.getElementById('cartTable');
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    let userId;

    if (loggedUser) {
        userId = loggedUser.id;
        const user = users.find(u => u.id === userId);

        if (user) {
            populateCart(user.cart);
            calculateTotal();
        }
    }

    function populateCart(cart) {
        let cartContent = '';
        cart.forEach(item => {
            cartContent += `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                    </td>
                    <td class="price">$. ${item.price.toFixed(2)}</td>
                    <td><input type="number" value="${item.quantity?item.quantity:1}" class="quantity" min="1" data-product-id="${item.id}"></td>
                    <td class="subtotal">$. ${item.quantity?(item.price * item.quantity)?.toFixed(2):"00"}</td>
                    <td><button class="remove-button" onclick="removeCartItem(${userId},${item.id})">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.625 7H20.125V4.8125C20.125 3.84727 19.3402 3.0625 18.375 3.0625H9.625C8.65977 3.0625 7.875 3.84727 7.875 4.8125V7H4.375C3.89102 7 3.5 7.39102 3.5 7.875V8.75C3.5 8.87031 3.59844 8.96875 3.71875 8.96875H5.37031L6.0457 23.2695C6.08945 24.202 6.86055 24.9375 7.79297 24.9375H20.207C21.1422 24.9375 21.9105 24.2047 21.9543 23.2695L22.6297 8.96875H24.2812C24.4016 8.96875 24.5 8.87031 24.5 8.75V7.875C24.5 7.39102 24.109 7 23.625 7ZM18.1562 7H9.84375V5.03125H18.1562V7Z" fill="#B88E2F"/>
                        </svg>
                    </button></td>
                </tr>
            `;
        });
        cartTable.innerHTML = cartContent;

        document.querySelectorAll('.quantity').forEach(input => {
            input.addEventListener('input', updateCartItem);
        });
    }

    function updateCartItem(event) {
        const input = event.target;
        const productId = parseInt(input.getAttribute('data-product-id'));
        const quantity = parseInt(input.value);
        if (userId && productId && quantity >= 1) {
            updateQuantityInCart(productId, userId, quantity);
            const user = users.find(u => u.id === userId);
            populateCart(user.cart);
            calculateTotal();
        }
    }
    window.removeWishlistItem=function (userId,productId){
        removeFromWishList(userId,productId)
        renderWishlist()
    }
    window.removeCartItem=function (userId, productId) {
        if (confirm("Are you sure you want to delete this item?")) {
            removeFromCart(userId, productId);
            const user = users.find(u => u.id === userId);
            populateCart(user?.cart);
            calculateTotal();
        }
    }

    function calculateTotal() {
        const user = users.find(u => u.id === userId);
        let total = 0;
        user.cart.forEach(item => {
            total += item.price * item.quantity;
        });
        subtotalDisplay.textContent = `$. ${total.toFixed(2)}`;
        totalDisplay.textContent = `$. ${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', () => {
        const user = users.find(u => u.id === userId);
        if (user && user.cart.length > 0) {
            placeOrder(userId, { date: new Date().toISOString() });
            populateCart(user.cart);
            calculateTotal();
            alert('Order placed Pending, please wait for admin confirmation');
        } else {
            alert('Your cart is empty!');
        }
    });
// handle links
const wishlistLink = document.getElementById('wishlistLink');
const cartLink = document.getElementById('cartLink');

// handle cart link
cartLink.addEventListener('click', () => {
    const user = users.find(u => u.id === userId);
    if (user) {
        populateCart(user.cart);
        calculateTotal();
document.getElementById("mainTitle").textContent="Cart";
    document.querySelectorAll(".forQuantity").forEach(ele=>{
        ele.style.display="block"
    })
    status.textContent="Subtotal"
    forDate.textContent="Remove"

    }
    
});


// handle wish list link
wishlistLink.addEventListener('click', () => {
    renderWishlist(); 
    document.getElementById("mainTitle").textContent="Wish List";
    document.querySelectorAll(".forQuantity").forEach(ele=>{
        ele.style.display="none"
    })
    status.textContent="Subtotal"
    forDate.textContent="Remove"


});


function renderWishlist() {
    const user = users.find(u => u.id === userId);
    console.log(user);
    if (user && user.wishList.length > 0) {
        let wishlistHtml = '';
        user.wishList.forEach(item => {
            wishlistHtml += `
                <tr>
                    <td>
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                    </td>
                    <td class="price">$. ${item.price.toFixed(2)}</td>
                    <td class="forQuantity"><input type="number" value="${item.quantity?item.quantity:1}" class="quantity" min="1" data-product-id="${item.id}"></td>
                    <td class="subtotal">$. ${item.quantity?(item.price * item.quantity)?.toFixed(2):"00"}</td>
                    <td>
                        <i onclick="removeWishlistItem(${userId},${item.id})" style="color:red; font-size:19px; cursor:pointer"  class="fas fa-heart add-to-wishlist"></i>
                   </td>
                </tr>
            `;
        });

document.getElementById("cartTable").innerHTML=wishlistHtml
    } else {
       
    }
}


// render orders link 
const ordersLink = document.getElementById('ordersLink');
    
var status=document.getElementById("forStatus")
var forDate=document.getElementById("forDate")
// Event listener for Orders link click
ordersLink.addEventListener('click', () => {
    renderOrders();
    document.getElementById("mainTitle").textContent = "Orders";
    document.querySelectorAll(".forQuantity").forEach(ele => {
        ele.style.display = "none";
    });
    status.textContent="Status";
    forDate.textContent="Date"
});

function renderOrders() {
    const pendingOrders = JSON.parse(localStorage.getItem("orders"));
   const currentUserOrders=pendingOrders.filter(order=>order.userId===userId)
    let ordersHtml = '';
    console.log(currentUserOrders);
    currentUserOrders.forEach(order => {
        const dateObject = new Date(order.date);
        const formattedDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
        ordersHtml += `
            <tr> 
                <td>${order.products?.length}</td>
                <td>$. ${order.totalPrice?.toFixed(2)}</td>
                <td style="font-weight:600; color: ${order.status==="accepted"?"green":order.status==="rejected"?"red":"orange"}">${order.status}</td>
                <td>${formattedDate}</td>
            </tr>
        `;
        document.getElementById("cartTable").innerHTML=ordersHtml
    });
}


// handle clicked link color
document.querySelectorAll(".subNav ul li").forEach(ele=>{
    ele.addEventListener('click', function(){
        document.querySelectorAll(".subNav ul li").forEach(ele=>{
            ele.classList.remove("specialLi")
        })
    this.classList.add("specialLi")
        
    })
})