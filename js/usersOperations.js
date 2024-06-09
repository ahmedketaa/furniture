// usersOperations.js
// usersOperations.js
import { users, saveUsers } from './users.js';
import { products,saveProducts } from './products.js';

export function addToCart(userId, productId) {
    console.log(userId +" "+ productId)
    const user = users.find(u => u.id === userId);
    const product = products.find(p => p.id === productId);
    console.log("test",product.status);
    if (user && product  && !isInCart(userId, productId)) {
        user.cart.push({ ...product, status: 'pending' });
        saveUsers(); 
        console.log(user.cart);
    }
}
// remove from cart

export function removeFromCart(userId, productId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.cart = user.cart.filter(p => p.id !== productId);
        saveUsers(); 
        console.log(user.cart);
    }
}


export function isInCart(userId, productId) {
    const user = users.find(u => u.id === userId);
        return user && user.cart.some(p => p.id === productId);
    
}
export function addToWishList(userId, productId) {
    const user = users.find(u => u.id === userId);
    const product = products.find(p => p.id === productId);
    if (user && product) {
        user.wishList.push(product);
        saveUsers(); 
    }
    console.log(user.wishList);
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
    return user && user.wishList.some(p => p.id === productId);
}

export function checkout(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.cart.forEach(product => {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products[index].status = 'pending';
            }
        });
        saveProducts();
    }
}

export function getCartByStatus(userId, status) {
    const user = users.find(u => u.id === userId);
    if (user) {
        return user.cart.filter(p => p.status === status);
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
}