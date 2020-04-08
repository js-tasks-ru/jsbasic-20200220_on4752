class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;

    this.el.addEventListener('click', (e) => {
      if (e.target.dataset.buttonRole === 'add-to-cart') {
        const message = 'Вы уверенны, что хотите добавить этот товар в корзину?';

        if (confirm(message)) {
          let product = e.target.closest('div.products-list-product')

          this._addProductToCart(product);
        }
      }
    });
  }

  show() {
    return fetch(this.productsUrl)
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this._showProducts();
      })
      .catch(error => console.log(new Error(error)));
  }

  _showProducts() {
    const productList = this.products
      .map(product => this._createCardProduct(product))
      .join('');

    this.el.innerHTML = `
      <div class="row justify-content-end">
        <div class="col-lg-9">
          <h3 class="section-title">Top Recommendations for You</h3>
            <div class="row homepage-cards">
              <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
              ${productList}
          </div>
        </div>
      </div>
    `;
  }

  _createCardProduct(product) {
    const price = this._createPrice(product);
    const stars = this._createStars(product);
    const reviews = this._createReviews(product);

    return `
      <div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-img-wrap">
            <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <div class="rate">
              ${stars}
              ${reviews}
            </div>
            ${price}
            <button class="product-add-to-cart" data-button-role="add-to-cart">
            Add to cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _createReviews(product) {
    return product.rating ? `<span class="rate-amount ml-2">${product.rating.reviewsAmount}</span>` : '';
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

  _createPrice(product) {
    if (product.oldPrice) {
      return `
        <p class="card-text price-text discount">
          <strong>${product.price}</strong>
          <small class="ml-2">${product.oldPrice}</small>
        </p>
      `;
    } else {
      return `
        <p class="card-text price-text">
          <strong>${product.price}</strong>
        </p>
      `;
    }
  }

  _addProductToCart(product) {
    let productId = +product.dataset.productId;
    let cart = JSON.parse(localStorage.getItem(this.productsStoreKey)) || [];

    if (cart.length === 0) {
      cart.push(this.products.find(item => item.id === productId));
      localStorage.setItem(this.productsStoreKey, JSON.stringify(cart));
    } else if (!(cart.find(item => item.id === productId))) {
      localStorage.removeItem(this.productsStoreKey);
      cart.push(this.products.find(item => item.id === productId));
      localStorage.setItem(this.productsStoreKey, JSON.stringify(cart));
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
