 



document.addEventListener('DOMContentLoaded', function () {
    const quantityInputs = document.querySelectorAll('.quantity');
    const priceElements = document.querySelectorAll('.price');
    const subtotalElements = document.querySelectorAll('.subtotal');
    var subtotalDisplay = document.getElementById('subtotal');
    var totalDisplay = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');
    const productsContainer = document.getElementById('products-container');
    var addButton=document.getElementById('add-button');

    var removeProduct = document.getElementById('remove-button');

    function updateTotals() {
        let subtotal = 0;

        quantityInputs.forEach((input, index) => {
            const price = parseFloat(priceElements[index].innerText.replace('Rs. ', '').replace(',', ''));
            const quantity = parseInt(input.value);
            const subtotalPrice = price * quantity;
            subtotalElements[index].innerText = `Rs. ${subtotalPrice.toLocaleString()}`;
            subtotal += subtotalPrice;
        });

        subtotalDisplay.innerText = `Rs. ${subtotal.toLocaleString()}`;
        totalDisplay.innerText = `Rs. ${subtotal.toLocaleString()}`;
    }

    quantityInputs.forEach(input => {
        input.addEventListener('change', updateTotals);
    });

    checkoutButton.addEventListener('click', function () {
        alert('Proceeding to checkout');
    });


    updateTotals();


removeProduct.addEventListener("click",  function removeTotals() {
    subtotalDisplay.innerText = '';
    totalDisplay.innerText = '';
});

addButton.addEventListener('click', function () {
    const newProduct = document.createElement('div');
    newProduct.className = 'product';
    newProduct.innerHTML = `
    <div class="product-image">
        <img src="#" alt="">
    </div>
    <div class="product-details">
        <h3>Product Title</h3>
        <p class="price">Rs. 1000</p>
        <div class="quantity">
            <input type="number" value="1">
        </div>
        <p class="subtotal">Rs. 1000</p>
    </div>
    `;
    document.body.appendChild(newProduct);
  
    updateTotals();
});

});
// Initial call to set totals correctly

// productsContainer.addEventListener('click', function (event) { 
//     if (event.target.classList.contains('quantity')) {
//         updateTotals();
//     }
// });


// const removeButton=document.getElementById('remove-button');
// removeButton.addEventListener('click', function () {
//     productsContainer.removeChild(productsContainer.lastElementChild);
//     updateTotals();
// });

addButton.addEventListener('click', function () {
    const newProduct = document.createElement('div');
    newProduct.className = 'product';
    newProduct.innerHTML = `
    <div class="product-image">
        <img src="https://picsum.photos/200/300" alt="">
    </div>
    <div class="product-details">
        <h3>Product Title</h3>
        <p class="price">Rs. 1000</p>
        <div class="quantity">
            <input type="number" value="1">
        </div>
        <p class="subtotal">Rs. 1000</p>
    </div>
    `;
    productsContainer.appendChild(newProduct);
    updateTotals();
});