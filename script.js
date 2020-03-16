const MENU = document.getElementById('menu');

const ARROW_LEFT = document.getElementById('arrow-left');
const ARROW_RIGHT = document.getElementById('arrow-right');
const FIRST_SLIDE = '<img id="vertical-iphone" class="vertical-iphone background-vertical-iphone"  src="./assets/iphone-vertical.png"><img id="horizontal-iphone" class="horizontal-iphone background-horizontal-iphone"  src="./assets/horizont-iphon.png">';
const SECOND_SLIDE = '<img src="./assets/Slide-2.png">';
const SLIDE_ARRAY = [FIRST_SLIDE, SECOND_SLIDE];

const FILTER_BUTTONS = document.getElementById('portfolio-filter');
const PORTFOLIO_IMAGES_ARRAY = Array.from(document.getElementsByClassName('portfolio-img')).map((imgNode) => imgNode.cloneNode());

const SUBJECT_ELEM = document.getElementById('subject');
const DESCRIPTION_ELEM = document.getElementById('description');
const SUBJECT_MESSAGE_FIELD = document.getElementById('text-subject');
const DESCRIPTION_MESSAGE_FIELD = document.getElementById('text-description');

const PORTFOLIO_IMAGES = document.getElementById('portfolio-content');

let currentSlide = 0;

const showSlide = (slideNumber) => {
  const slider = document.getElementById('slider-content');

  slider.innerHTML = SLIDE_ARRAY[slideNumber];
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

ARROW_LEFT.addEventListener('click', () => {
  currentSlide -= 1;
  if (currentSlide < 0) currentSlide = SLIDE_ARRAY.length - 1;
  showSlide(currentSlide);
  if (currentSlide === 0) addVerticalIphoneListener();
  if (currentSlide === 0) addHorizontalIphoneListener();
});

ARROW_RIGHT.addEventListener('click', () => {
  currentSlide += 1;
  if (currentSlide > SLIDE_ARRAY.length - 1) currentSlide = 0;
  showSlide(currentSlide);
  if (currentSlide === 0) addVerticalIphoneListener();
  if (currentSlide === 0) addHorizontalIphoneListener();
});

const filterPortfolioImages = (dataType) => {
  const portfolioContent = document.getElementById('portfolio-content');

  if (!dataType) {
    portfolioContent.innerHTML = '';
    PORTFOLIO_IMAGES_ARRAY.forEach((image) => portfolioContent.appendChild(image));
    return;
  }

  const filteredArray = PORTFOLIO_IMAGES_ARRAY.filter((image) => image.dataset.type === dataType);
  portfolioContent.innerHTML = '';
  filteredArray.forEach((image) => portfolioContent.appendChild(image));
};

FILTER_BUTTONS.addEventListener('click', (event) => {
  if (event.target === FILTER_BUTTONS) return;
  FILTER_BUTTONS.querySelectorAll('div').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');

  filterPortfolioImages(event.target.dataset.type);
});

document.getElementById('form').addEventListener('submit', (event) => {
  const subjText = SUBJECT_ELEM.value.trim();
  const descText = DESCRIPTION_ELEM.value.trim();

  SUBJECT_MESSAGE_FIELD.innerText = subjText ? `Тема: ${subjText}` : 'Без темы';
  DESCRIPTION_MESSAGE_FIELD.innerText = descText ? `Описание: ${descText}` : 'Без описания';

  document.getElementById('message-block').classList.remove('hidden');
  event.preventDefault();
});

document.getElementById('close-button').addEventListener('click', () => {
  document.getElementById('message-block').classList.add('hidden');
});

addVerticalIphoneListener();
addHorizontalIphoneListener();

// проверить нужно ли удалять лисенер, когда переключать новый слайд

PORTFOLIO_IMAGES.addEventListener('click', (event) => {
  if (event.target.nodeName === 'IMG') {
    PORTFOLIO_IMAGES.querySelectorAll('img').forEach((el) => el.classList.remove('active-img'));
    event.target.classList.add('active-img');
  }
});
