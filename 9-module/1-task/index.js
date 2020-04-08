'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    this.el = parentElement;
    this.cart = JSON.parse(localStorage.getItem(this.productsStoreKey));

    this._showProducts();
    
    this.el.addEventListener('click', (e) => {
      const message = 'Вы уверенны, что хотите удалить этот товар из корзины?';

      if (e.target.dataset.buttonRole === 'checkout-remove-product') {
        if(confirm(message)) {
          let product = e.target.closest('div.product-wrapper')

          this._deleteProductFromCart(product);
        }
      }
    });
  }

  _showProducts() {
    const productList = this.cart
      .map(product => this._createCardProduct(product))
      .join('');

    this.el.innerHTML = `
      <div class="product-list-box">
        ${productList}
      </div>
    `;
  }

  _createCardProduct(product) {
    const stars = this._createStars(product);
    const reviews = this._createReviews(product);

    return `
      <div data-product-id="${product.id}" class="product-wrapper box-inner-col description-col">
        <div class="product-image-container">
          <img class="product-image" src="${product.imageUrl}" alt="img">
        </div>
        <div class="product-description">
          <h4 class="col-title mb-2">${product.title}</h4>
          <div class="rate">
            ${stars}
          </div>
          <p class="rate-amount d-none d-md-block mt-1">${reviews} reviews</p>
        </div>
        <div class="product-price">
          <p class="mb-0 font-weight-light">Price:</p>
          <h4 class="col-title price-text mb-2">${product.price}</h4>
        </div>
        <div class="product-remove-button-wrapper">
          <button type="button"
                  data-button-role="checkout-remove-product"
                  class="product-remove-button">
            X
          </button>
        </div>
      </div>
    `;
  }

  _createReviews(product) {
    return product.rating ? 
      `<p class="rate-amount d-none d-md-block mt-1">${product.rating.reviewsAmount} reviews</p>` :
       '';
  }

  _createStars(product) {
    const star = '<i class="icon-star"></i>';
    const starChecked = '<i class="icon-star checked"></i>';

    let checkedStars = product.rating ? product.rating.stars : false;
    let allStars = '';

    for (let i = 0; i < 5; i++ ) {
      if (checkedStars) {
        allStars += starChecked;
        checkedStars -= 1;
      } else {
        allStars += star;
      }
    }

    return allStars;
  }

  _deleteProductFromCart(product) {
    let productId = +product.dataset.productId;

    let id = this.cart.findIndex(product => product.id === productId);
    this.cart.splice(id, 1);
    
    localStorage.removeItem(this.productsStoreKey);
    localStorage.setItem(this.productsStoreKey, JSON.stringify(this.cart));

    this._showProducts();
  }
}

window.CheckoutProductList = CheckoutProductList;
