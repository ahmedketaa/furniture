import { products ,saveProducts} from './products.js';

// Add a new product (admin only)
export function addProduct(product) {
  products.push(product);
  saveProducts(); // Save to local storage
}

// Update an existing product (admin only)
export function updateProduct(productId, updatedProduct) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(); // Save to local storage
  }
}

// Delete a product (admin only)
export function deleteProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(); // Save to local storage
  }
}

  