// usersOperations.js
import { users, saveUsers } from './users.js';
import { products,saveProducts } from './products.js';
import { saveOrder } from './order.js';

export function addToCart(userId, productId) {
    console.log(userId + " " + productId)
    const user = users.find(u => u.id === userId);
    const product = products.find(p => p.id === productId);
    console.log("test", product.status);
    if (user && product && !isInCart(userId, productId)) {
        user.cart = user.cart || []; 
        user.cart.push({ ...product, status: 'pending' });
        saveUsers();
        
    }
}
// remove from cart

export function removeFromCart(userId, productId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.cart = user.cart.filter(p => p.id !== productId);
        saveUsers(); 
        alert("Item removed Successfully")
        console.log(user.cart);
    }
}


export function isInCart(userId, productId) {
    const user = users.find(u => u.id === userId);
    return user && user.cart && user.cart.some(p => p.id === productId); // Check if cart exists
}
export function addToWishList(userId, productId) {
    const user = users.find(u => u.id === userId);
    console.log("user: ",user);
    const product = products.find(p => p.id === productId);
    console.log("product: ",product);
    if (user && product) {
        if (!user.wishList) user.wishList = []; 
        user.wishList.push(product);
        console.log(user);
        saveUsers();
    }
    console.log(user?.wishList);
}


export function removeFromWishList(userId, productId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.wishList = user.wishList.filter(p => p.id !== productId);
        saveUsers();
    }
}

export function isInWishlist(userId, productId) {
    const user = users.find(u => u.id === userId);
    return user && user.wishList && user.wishList.some(p => p.id === productId); // Check if wishList exists
}


export function getUserCarts(userId) {
    const user = users.find(u => u.id === userId);
    if (user.cart) {
        return user.cart;
    }
    return [];
}

export function updateOrderStatus(productId, status) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.status = status;
        const user = users.find(u => u.cart.some(c => c.id === productId));
        if (user) {
            const cartProduct = user.cart.find(p => p.id === productId);
            cartProduct.status = status;
            user.notifications.push(`Your order for ${product.name} has been ${status}.`);
            saveUsers();
        }
        saveProducts();
    }
}



//function to check if user is logged in
export function userIsLogged() {
    const user = localStorage.getItem("loggedUser");
    if (user) {
      return true;
    } else {
      return false;
    }
  }



// logout function
export function logOut(){
    localStorage.removeItem("loggedUser")
    // this line to remove logout icon from navbar
    const logOutIcon=document.querySelectorAll(".log_out_icon");
    logOutIcon.forEach(icon=>{
      icon.style.display="none"
    });
    window.location.href = "./index.html";
}


export function updateQuantityInCart(productId , userId, quantity){
    let loggedUser = users.find((user)=>{
       return user.id == userId
    })

    if(loggedUser){
        let cartProduct = loggedUser.cart.find((product)=>product.id===productId)
        cartProduct.quantity = quantity;
    }

    saveUsers()
}

    export function placeOrder(userId, data) {
    let user = users.find(user => user.id === userId);

    if (user && user.cart.length > 0) {
        let userCart = user.cart;
        let totalPrice = 0;

        for (let i = 0; i < userCart.length; i++) {
            let price = userCart[i].price;
            let quantity = userCart[i].quantity;
            totalPrice = (price * quantity) + totalPrice;
        }

        const orderProducts = userCart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
            ...data
        }));

        const order = {
            status: "pending",
            userId,
            products: orderProducts,
            totalPrice,
            ...data
        };


        saveOrder(order);
        console.log(order);
        user.cart = [];
        saveUsers();
    }
}