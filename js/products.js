// products.js
export const products = [
    { id: 1, name: 'Modern Sofa', category: 'Furniture', price: 250, image: './assets/Rectangle26.png' },
    { id: 2, name: 'Dining Table', category: 'Furniture', price: 300, image: './assets/Rectangle27.png' },
    { id: 3, name: 'Lamp', category: 'Furniture', price: 100, image: './assets/Rectangle28.png' },
    { id: 4, name: 'Bookshelf', category: 'Furniture', price: 150, image: './assets/Rectangle28.png' },
    { id: 5, name: 'Armchair', category: 'Furniture', price: 200, image: './assets/Rectangle29.png' },
    { id: 6, name: 'Coffee Table', category: 'Furniture', price: 180, image: './assets/Rectangle28.png' },
    { id: 7, name: 'Bed Frame', category: 'Furniture', price: 400, image: './assets/Rectangle26.png' },
    { id: 8, name: 'Wardrobe', category: 'Furniture', price: 350, image: './assets/Rectangle28.png' },
    { id: 9, name: 'Desk', category: 'Furniture', price: 120, image: './assets/Rectangle26.png' },
    { id: 10, name: 'Side Table', category: 'Furniture', price: 80, image: './assets/Rectangle28.png' },
    { id: 11, name: 'Chair', category: 'Furniture', price: 70, image: './assets/Rectangle26.png' },
    { id: 12, name: 'Cabinet', category: 'Furniture', price: 220, image: './assets/Rectangle28.png' },
    { id: 13, name: 'Shoe Rack', category: 'Furniture', price: 90, image: './assets/Rectangle26.png' },
    { id: 14, name: 'Dresser', category: 'Furniture', price: 280, image: './assets/Rectangle28.png' },
    { id: 15, name: 'Console Table', category: 'Furniture', price: 160, image: './assets/Rectangle26.png' }
];


export function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
  }