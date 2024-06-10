// categories.js
export let categories = [
   {
    name: "Living Room",
    id:1
   },
    { 
    name:"Bedroom",
    id:2    
    },

   { 
    name:"Dining Room",
    id:3
    },
   {
    name: "Office",
    id:4
    },
   {
    name: "Storage",
    id:5
    },
    {
        name:"Decorative",
        id: 6
    }
];;

export function loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    categories = storedCategories ? JSON.parse(storedCategories) : categories;
    return categories;
}

export function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}

loadCategories();
