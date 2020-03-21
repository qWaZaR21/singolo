const MENU = document.getElementById('menu');
const HEADER = document.getElementById('header');

const ARROW_LEFT = document.getElementById('arrow-left');
const ARROW_RIGHT = document.getElementById('arrow-right');
const FIRST_SLIDE = '<img id="vertical-iphone" class="vertical-iphone background-vertical-iphone"  src="./assets/iphone-vertical.png"><img id="horizontal-iphone" class="horizontal-iphone background-horizontal-iphone"  src="./assets/horizont-iphon.png">';
const SECOND_SLIDE = '<img src="./assets/Slide-2.png">';
const TR_SLIDE = '<img src="./assets/Slide-3.png">';
const SLIDE_ARRAY = [FIRST_SLIDE, SECOND_SLIDE, TR_SLIDE];

const FILTER_BUTTONS = document.getElementById('portfolio-filter');
const PORTFOLIO_IMAGES_ARRAY = Array.from(document.getElementsByClassName('portfolio-img')).map((imgNode) => imgNode.cloneNode());

const SUBJECT_ELEM = document.getElementById('subject');
const DESCRIPTION_ELEM = document.getElementById('description');
const SUBJECT_MESSAGE_FIELD = document.getElementById('text-subject');
const DESCRIPTION_MESSAGE_FIELD = document.getElementById('text-description');

const PORTFOLIO_IMAGES_CONTAINER = document.getElementById('portfolio-content');

const SLIDER = document.getElementById('slider-content');

let currentSlide = 0;
let valeuScroll = 0;



const deleteSideSlide = () => {
  SLIDER.querySelectorAll('div').forEach((el) => {
    if (el.classList.contains('left-slide') || el.classList.contains('rigth-slide')) el.remove();
  });
};

// перемещает слева в центр
const showLeftSlide = () => {
  SLIDER.querySelectorAll('div').forEach((el) => {
    if (el.classList.contains('left-slide')) el.classList.remove('left-slide');
  });
};

// смещаем центральный слайд вправо
const swipeRigthCentralSlide = () => {
  SLIDER.firstElementChild.classList.add('rigth-slide');
};


// добавляем новый слайд слева
const addLeftSlide = (slideNumber) => {
  const nextSlide = document.createElement('div');
  nextSlide.classList.add('slide');
  nextSlide.innerHTML = SLIDE_ARRAY[slideNumber];
  nextSlide.classList.add('left-slide');

  swipeRigthCentralSlide();
  SLIDER.prepend(nextSlide);
  window.requestAnimationFrame(showLeftSlide);

  setTimeout(deleteSideSlide, 1600);
};

// перемещает справа в центр
const showRigthSlide = () => {
  SLIDER.querySelectorAll('div').forEach((el) => {
    if (el.classList.contains('rigth-slide')) el.classList.remove('rigth-slide');
  });
};

// смещаем центральный слайд влево
const swipeLeftCentralSlide = () => {
  SLIDER.firstElementChild.classList.add('left-slide');
};

/////    ///////   //
// добавляем новый слайд справа
const addRigthSlide = (slideNumber) => {
  const nextSlide = document.createElement('div');
  nextSlide.classList.add('slide');
  nextSlide.innerHTML = SLIDE_ARRAY[slideNumber];
  nextSlide.classList.add('rigth-slide');

  swipeLeftCentralSlide();
  SLIDER.prepend(nextSlide);

  window.requestAnimationFrame(showRigthSlide);

  setTimeout(deleteSideSlide, 1600);
};

MENU.addEventListener('click', (event) => {
  if (event.target.nodeName === 'A') {
    MENU.querySelectorAll('li').forEach((el) => el.firstChild.classList.remove('active-menu'));
    event.target.classList.add('active-menu');
  }
});

const addVerticalIphoneListener = () => {
  const VERTICAL_IPHONE = document.getElementById('vertical-iphone');
  VERTICAL_IPHONE.addEventListener('click', () => {
    if (VERTICAL_IPHONE.classList.contains('background-vertical-iphone')) {
      VERTICAL_IPHONE.classList.remove('background-vertical-iphone');
      return;
    }
    VERTICAL_IPHONE.classList.add('background-vertical-iphone');
  });
};

const addHorizontalIphoneListener = () => {
  const HORIZONTAL_IPHONE = document.getElementById('horizontal-iphone');
  HORIZONTAL_IPHONE.addEventListener('click', () => {
    if (HORIZONTAL_IPHONE.classList.contains('background-horizontal-iphone')) {
      HORIZONTAL_IPHONE.classList.remove('background-horizontal-iphone');
      return;
    }
    HORIZONTAL_IPHONE.classList.add('background-horizontal-iphone');
  });
};

const arrowLeftListener = () => {
  currentSlide -= 1;
  if (currentSlide < 0) currentSlide = SLIDE_ARRAY.length - 1;
  addLeftSlide(currentSlide);
  if (currentSlide === 0) {
    addVerticalIphoneListener();
    addHorizontalIphoneListener();
  }

  ARROW_LEFT.removeEventListener('click', arrowLeftListener);
  ARROW_RIGHT.removeEventListener('click', arrowRightListener);

  setTimeout(() => ARROW_LEFT.addEventListener('click', arrowLeftListener), 1600);
  setTimeout(() => ARROW_RIGHT.addEventListener('click', arrowRightListener), 1600);

};

ARROW_LEFT.addEventListener('click', arrowLeftListener);

const arrowRightListener = () => {
  currentSlide += 1;
  if (currentSlide > SLIDE_ARRAY.length - 1) currentSlide = 0;
  addRigthSlide(currentSlide);
  if (currentSlide === 0) {
    addVerticalIphoneListener();
    addHorizontalIphoneListener();
  }
  
  ARROW_RIGHT.removeEventListener('click', arrowRightListener);
  ARROW_LEFT.removeEventListener('click', arrowLeftListener);

  setTimeout(() => ARROW_RIGHT.addEventListener('click', arrowRightListener), 1600);
  setTimeout(() => ARROW_LEFT.addEventListener('click', arrowLeftListener), 1600);
};

ARROW_RIGHT.addEventListener('click', arrowRightListener);


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const fillPortfolioImagesContainer = (portfolioImages) => {
  PORTFOLIO_IMAGES_CONTAINER.innerHTML = '';
  portfolioImages.forEach((image) => PORTFOLIO_IMAGES_CONTAINER.appendChild(image.cloneNode()));
};

//active filter button and filter img
FILTER_BUTTONS.addEventListener('click', (event) => {
  if (event.target === FILTER_BUTTONS || event.target.classList.contains('active')) return;
  FILTER_BUTTONS.querySelectorAll('div').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');

  fillPortfolioImagesContainer(shuffle(PORTFOLIO_IMAGES_ARRAY));
});

// submit message
document.getElementById('form').addEventListener('submit', (event) => {
  const subjText = SUBJECT_ELEM.value.trim();
  const descText = DESCRIPTION_ELEM.value.trim();

  SUBJECT_MESSAGE_FIELD.innerText = subjText ? `Тема: ${subjText}` : 'Без темы';
  DESCRIPTION_MESSAGE_FIELD.innerText = descText ? `Описание: ${descText}` : 'Без описания';

  document.getElementById('message-block').classList.remove('hidden');
  event.preventDefault();
});

//close popup window and clean field
document.getElementById('close-button').addEventListener('click', () => {
  document.getElementById('message-block').classList.add('hidden');

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  SUBJECT_ELEM.value = '';
  DESCRIPTION_ELEM.value = '';

});

addVerticalIphoneListener();
addHorizontalIphoneListener();

//add border around img
PORTFOLIO_IMAGES_CONTAINER.addEventListener('click', (event) => {
  if (event.target.nodeName === 'IMG') {
    PORTFOLIO_IMAGES_CONTAINER.querySelectorAll('img').forEach((el) => el.classList.remove('active-img'));
    event.target.classList.add('active-img');
  }
});

window.addEventListener('scroll', () => {
  (window.scrollY > 0) ? HEADER.classList.add('not-static') : HEADER.classList.remove('not-static');
});

// window.addEventListener('scroll', () => {
//   (valeuScroll > window.scrollY) ? HEADER.classList.remove('ninja') : HEADER.classList.add('ninja');
//   valeuScroll = window.scrollY;
// });


document.addEventListener('scroll', () => {

  const curPos = window.scrollY;
  const divs = document.querySelectorAll('.anchors');
  const links = document.querySelectorAll('#menu a');

  divs.forEach((el) => {

    if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
      links.forEach((a) => {
        a.classList.remove('active-menu');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active-menu');
        }
      });
    }
  });
});