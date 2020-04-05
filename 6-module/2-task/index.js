'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;
    this.current = 0;

    this.createBodySlides();
    this.createSlides(this.slides);

    this.el.addEventListener('click', (e) => {

      if (e.target.closest('button.carousel-control-next')) {
        this.removeClassActive()
        this.toNextSlide();
        this.addClassActive();
      } else if (e.target.closest('button.carousel-control-prev')) {
        this.removeClassActive()
        this.toPrevSlide();
        this.addClassActive();
      }
    });

    this.el.querySelector('.carousel-indicators').addEventListener('click', (e) => {
      this.removeClassActive();
      this.current = +e.target.dataset.slideTo;
      this.addClassActive();
    });
  }

  createBodySlides() {
    this.el.innerHTML = `<div id="mainCarousel" class="main-carousel carousel slide">
                            <ol class="carousel-indicators">
                                <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator active"></li>
                                <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
                                <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
                            </ol>
                            <div class="carousel-inner">
                                <!--Вот здесь будет активный слайд-->
                            </div>
                            
                            <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </button>
                            <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </button>
                        </div>`
  }

  createSlides(arr) {
    for (const obj of arr) {
      let div = document.createElement('div');
      div.classList.add('carousel-item');
      div.dataset.id = obj.id;

      if (obj.id === 0) {
        div.classList.add('active');
      }
  
      div.innerHTML = `<img src="${obj.img}" alt="Activelide">
                          <div class="container">
                            <div class="carousel-caption">
                                <h3 class="h1">${obj.title}</h3>
                                <div>
                                    <a class="btn" href="#" role="button">
                                        View all DEALS
                                        <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                                    </a>
                                </div>
                            </div>
                          </div>`;

      this.el.querySelector('.carousel-inner').appendChild(div);
    }
  
  }

  setPositionSlide() {
    //
  }

  toNextSlide() {
    this.current < 2 ? this.current +=1 : this.current = 0;
  }

  toPrevSlide() {
    this.current > 0 ? this.current -= 1 : this.current = 2;
  }

  addClassActive() {
    this.el.querySelector(`div[data-id="${this.current}"]`).classList.add('active');
    this.el.querySelector(`.carousel-indicators *[data-slide-to="${this.current}"]`).classList.add('active');
  }

  removeClassActive() {
    this.el.querySelector(`div[data-id="${this.current}"]`).classList.remove('active');
    this.el.querySelector(`.carousel-indicators *[data-slide-to="${this.current}"]`).classList.remove('active');
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
