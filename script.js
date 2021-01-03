shoppingCart();

function shoppingCart() {
  let addToCartItems = document.querySelectorAll(".shop-item-button");
  for (let i = 0; i < addToCartItems.length; i++) {
    addToCartItem = addToCartItems[i];
    addToCartItem.addEventListener("click", addToCart);
  }

  let removeCartIntemsBtn = document.querySelectorAll(".remove-cart-btn");
  for (let i = 0; i < removeCartIntemsBtn.length; i++) {
    let removeBtn = removeCartIntemsBtn[i];
    removeBtn.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", quantityChanged);
  }
}

function addToCart(e) {
  let button = e.target;
  let shopItems = button.parentElement.parentElement;
  let title = shopItems.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItems.getElementsByClassName("shop-item-price")[0].innerText;
  let image = shopItems.getElementsByClassName("shop-item-image")[0].src;
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemsName = document.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText === title) {
      alert("Cart Item is Already been Added");
      return;
    }
  }
  let cartRowContent = `
    <div class="cart-item cart-coloum my-auto">
        <img
            src="${image}"
            alt="" width="100" height="100"/>
        <span class="cart-item-title">
            ${title}
        </span>
    </div> 
    <span class="cart-item cart-price my-auto"> 
        ${price}
    </span>
    <div class="cart-quantity cart-coloum my-auto">
        <input
            class="cart-quantity-input" type="number"  name=""
              id="" value="1" />
        <button class="btn btn-danger remove-cart-btn" type="button">
            REMOVE
        </button>
     </div>  
  `;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  updateTotal();
  cartRow
    .getElementsByClassName("remove-cart-btn")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function removeCartItem(e) {
  e.target.parentElement.parentElement.remove();
  updateTotal();
}

function quantityChanged(e) {
  let quantityInput = e.target;
  if (!isNaN(quantityInput) || quantityInput.value <= 0) {
    quantityInput.value = 1;
  }
  updateTotal();
}

function updateTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartItemrows = cartItemContainer.getElementsByClassName("cart-row");
  let totalPrice = 0;
  for (let i = 0; i < cartItemrows.length; i++) {
    let cartItemrow = cartItemrows[i];
    let priceElement = cartItemrow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartItemrow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseInt(priceElement.innerText);
    let quantity = parseInt(quantityElement.value);
    totalPrice += price * quantity;
  }
  document.getElementsByClassName(
    "cart-total-price"
  )[0].innerHTML = `&#2547;${totalPrice}`;
}
