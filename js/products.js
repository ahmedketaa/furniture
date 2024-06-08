// products.js
   


export const products = loadProducts();

export function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Products saved');
}

export function loadProducts() {
    const productsJSON = localStorage.getItem('products');
    if (productsJSON) {
        return JSON.parse(productsJSON);
    }
    return [
        { id: 1, name: 'Modern Sofa', category: 'Living Room', price: 250, status: "available", image: './assets/Rectangle26.png', description: 'A sleek and comfortable modern sofa perfect for your living room.' },
        { id: 2, name: 'Dining Table', category: 'Dining Room', price: 300, status: "available", image: './assets/Rectangle27.png', description: 'A sturdy dining table ideal for family gatherings and dinner parties.' },
        { id: 3, name: 'Lamp', category: 'Decorative', price: 100, status: "available", image: './assets/Rectangle28.png', description: 'An elegant lamp to brighten up any room with style.' },
        { id: 4, name: 'Bookshelf', category: 'Storage', price: 150, status: "available", image: './assets/Rectangle28.png', description: 'A versatile bookshelf to organize your books and display decorative items.' },
        { id: 5, name: 'Armchair', category: 'Living Room', price: 200, status: "available", image: './assets/Rectangle29.png', description: 'A cozy armchair perfect for reading or relaxing.' },
        { id: 6, name: 'Coffee Table', category: 'Living Room', price: 180, status: "available", image: './assets/Rectangle28.png', description: 'A stylish coffee table to complement your living room decor.' },
        { id: 7, name: 'Bed Frame', category: 'Bedroom', price: 400, status: "available", image: './assets/Rectangle26.png', description: 'A sturdy bed frame for a comfortable and restful sleep.' },
        { id: 8, name: 'Wardrobe', category: 'Bedroom', price: 350, status: "available", image: './assets/Rectangle28.png', description: 'A spacious wardrobe to store and organize your clothes and accessories.' },
        { id: 9, name: 'Desk', category: 'Office', price: 120, status: "available", image: './assets/Rectangle26.png', description: 'A functional desk for studying or working from home.' },
        { id: 10, name: 'Side Table', category: 'Living Room', price: 80, status: "available", image: './assets/Rectangle28.png', description: 'A versatile side table to hold your drinks, books, or decor.' },
        { id: 11, name: 'Chair', category: 'Office', price: 70, status: "available", image: './assets/Rectangle26.png', description: 'A simple and practical chair for additional seating.' },
        { id: 12, name: 'Cabinet', category: 'Storage', price: 220, status: "available", image: './assets/Rectangle28.png', description: 'A stylish cabinet to store your belongings and keep your space organized.' },
        { id: 13, name: 'Shoe Rack', category: 'Storage', price: 90, status: "available", image: './assets/Rectangle26.png', description: 'A compact shoe rack to keep your footwear neat and tidy.' },
        { id: 14, name: 'Dresser', category: 'Bedroom', price: 280, status: "available", image: './assets/Rectangle28.png', description: 'A functional dresser with drawers for storing clothes and accessories.' },
        { id: 15, name: 'Console Table', category: 'Living Room', price: 160, status: "available", image: './assets/Rectangle26.png', description: 'A sleek console table for displaying decorative items or serving as an entryway table.' }
    ];
    
    
}
