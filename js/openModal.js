var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
export function openModal() {
    modal.style.display = "block";
}

export function closeModal() {
    const productForm = document.getElementById('productForm');
    console.log(productForm);
    productForm.reset()
    modal.style.display = "none";
}