// for(var i=0 ;i<=10;i++){

//    var myImages= document.createElement("img");
//    myImages.setAttribute("src","https://picsum.photos/200/300");
//    document.body.appendChild(myImages);
//    document.images[i].setAttribute("alt","Elzero web school")

// }

// document.images[0].src = "https://elzero.org/wp-content/themes/elzero/imgs/logo.png";
// document.images[0].style = "display:flex; justify-content:center;align-items:center;padding-top:40px";
// document.body.style.backgroundColor="black";

// var moneyHoisting = document.getElementById("usdMoney");
// moneyHoisting.addEventListener("input", function () {
//     moneyHoisting.value *= 15.6;
//     const num=parseFloat(moneyHoisting.value);

//   console.log(moneyHoisting.value);
//   document.getElementById("moneyShow").innerHTML = ("");

// });

// var moneyHoisting = document.getElementById("usdMoney");
// moneyHoisting.addEventListener("input", function () {
//   const dollarValue = parseFloat(moneyHoisting.value);
//   if (!isNaN(dollarValue)) {
//     const egyptianPoundValue = dollarValue * 15.6;
//     document.getElementById("moneyShow").innerHTML = `Amount in USD: $${dollarValue.toFixed(2)} 
//     <br> Equivalent in EGP: ${egyptianPoundValue.toFixed(2)} جنيه مصري`;
//     document.getElementById("moneyShow").style.color = "green";
//   } else {
//     document.getElementById("moneyShow").innerHTML = "";
//   }
// });

// var mainDiv = document.createElement("div");
// var firstHead = document.createElement("h3");
// var onePragraph = document.createElement("p");

// mainDiv.className = "products_container";


// firstHeadText=document.createTextNode("product title")

// onePragraphText=document.createTextNode("product Descriptions");
// document.body.appendChild(mainDiv);


// firstHead.appendChild(firstHeadText);

// mainDiv.appendChild(firstHead);

// onePragraph.appendChild(onePragraphText);
// mainDiv.appendChild(onePragraph);

// var images = document.querySelectorAll('img')

// for(let i=0; i<images.length; i++){
//     images[i].style.width = "200px";
//     images[i].style.height = "200px";
//     images[i].style.margin = "10px";
//     images[i].style.borderRadius = "10px";
//     images[i].style.boxShadow = "0 0 10px #000";
//     images[i].style.border = "1px solid #000";
//     images[i].style.cursor = "pointer";
//     images[i].style.transition = "all 0.5s";
// }

// for(let i=0; i<images.length; i++){

//     if(images[i].hasAttribute("alt")){

//         images[i].setAttribute("alt","old")
//     }
// else{
//     images[i].setAttribute("alt","Elzero New")
// }

// }
// let text = " JavaScript is awesome! ";
// console.log(text.split("   , "));


    



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