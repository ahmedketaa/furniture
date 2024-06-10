// // userOperations.js
// let users = JSON.parse(localStorage.getItem('users')) || [];

// function saveUsersToLocalStorage() {
//     localStorage.setItem('users', JSON.stringify(users));
// }

// export function getCartByStatus(userId, status) {
//     const user = users.find(u => u.id === userId);
//     if (user) {
//         return user.cart.filter(p => p.status === status);
//     }
//     return [];
// }

// export function addToCart(userId, product) {
//     const user = users.find(u => u.id === userId);
//     if (user) {
//         user.cart.push({ ...product, status: 'pending' });
//         saveUsersToLocalStorage();
//     }
// }
