// productOperations.js
import { products } from './products.js';

export function getLatestProducts() {
    return products.slice(-3);
}

export function filterProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

export function getProductById(productId) {
    return products.find(p => p.id === productId);
}
