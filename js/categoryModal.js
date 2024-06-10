const categoryModal = document.getElementById('categoryModal');
const categoryForm = document.getElementById('categoryForm');
const categoryModalTitle = document.getElementById('categoryModalTitle');
const addCategoryBtn = document.getElementById('addCategoryBtn');



// Event listener for form submission

// Function to open modal for adding or editing category
export function openCategoryModal() {
    categoryModal.style.display = 'block';
  
}

// Function to close modal
export function closeCategoryModal () {
    categoryModal.style.display = 'none';
}
