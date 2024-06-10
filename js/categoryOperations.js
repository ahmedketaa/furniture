// categoryOperations.js
import { categories, saveCategories } from './categories.js';

export function addCategory(name) {
    if (!name) throw new Error('Category name is required');
    const newCategory = {
        id: generateUniqueId(categories),
        name,
    };
    categories.push(newCategory);
    saveCategories();
}

export function updateCategory(id, name) {
    if (!id || !name) throw new Error('Category ID and name are required');
    const categoryIndex = categories.findIndex(category => category.id === id);
    if (categoryIndex === -1) throw new Error('Category not found');
    categories[categoryIndex].name = name;
    saveCategories();
}

export function deleteCategory(id) {
    const categoryIndex = categories.findIndex(category => category.id === id);
    if (categoryIndex === -1) throw new Error('Category not found');
    categories.splice(categoryIndex, 1);
    saveCategories();
}

export function getCategoryById(id) {
    return categories.find(category => category.id === id);
}

function generateUniqueId(items) {
    return items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;
}
