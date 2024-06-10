import { products ,saveProducts} from './products.js';

// Add a new product 
export function addProduct(product) {
  products.push(product);
  saveProducts(); // Save to local storage
}

// Update an existing product 
export function updateProduct(productId, updatedProduct) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(); 
  }
}

// Delete a product 
export function deleteProduct(productId) {
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(); 
  }
}

  