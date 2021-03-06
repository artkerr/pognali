var link = document.querySelector(".rate__link, .route__country-empty-select");

var popup = document.querySelector(".modal");
if (popup) {
  var close = popup.querySelector(".modal__close, .modal-calendar__close-btn");
}

var header = document.querySelector(".js-header");
var headerClouseButton = document.querySelector(".js-clouse-header");
var headerOpenButton = document.querySelector(".js-show-h-menu");
var headerNavs = document.querySelector('.js-h-navs');

var countryFilterToggleButton = document.querySelector('.js-country-filter-toggle');
var countryFilterWrapper = document.querySelector('.js-cfw');
var countryFiltersHideButton = document.querySelector('.js-filters-hide');

var pageMain = document.querySelector('.js-page-main');

/* State object */
var state = {
  isHeaderSticky: false,
  isHeaderOpen: false,
  isCountrySelectorOpen: false
};

/* Function for management state */
function changeState(property, newState) {
  state[property] = newState;
}

document.addEventListener("DOMContentLoaded", function(evt) {
  doHeaderStatic();
  header.classList.remove('page-header__wrapper-sticky-static');
  headerClouseButton.classList.remove('page-header__close-btn--hidden');
  pageMain.classList.remove('page-main--no-padding');
  headerNavs.classList.remove('page-header__open');
  document.dispatchEvent(new Event('scroll'));
});

function setEventListener(el, f) {
  console.log('set event listener');
  if (el) {
    el.addEventListener("click", f);
  }
}

setEventListener(countryFilterToggleButton, function(evt) {
  evt.preventDefault();

  if (state.isCountrySelectorOpen) {
    // Need hide
    changeState('isCountrySelectorOpen', false);
    countryFilterWrapper.classList.add('country-filter__wrapper--hidden');
  } else {
    // Need open
    changeState('isCountrySelectorOpen', true);
    countryFilterWrapper.classList.remove('country-filter__wrapper--hidden');
  }
});

setEventListener(countryFiltersHideButton, function(evt) {
  evt.preventDefault();

  changeState('isCountrySelectorOpen', false);
  countryFilterWrapper.classList.add('country-filter__wrapper--hidden');
});

setEventListener(headerClouseButton, function(evt) {
  changeState('isHeaderOpen', false);
  headerNavs.classList.remove('page-header__open');
  document.dispatchEvent(new Event('scroll'));
});

setEventListener(headerOpenButton, function(evt) {
  if (!state.isHeaderSticky) {
    changeState('isHeaderSticky', true);
    doHeaderSticky();
  }
  changeState('isHeaderOpen', true);
  headerNavs.classList.add('page-header__open');
})

setEventListener(link, function (evt) {
  evt.preventDefault();
  popup.classList.add("modal__show");
});

setEventListener(close, function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27 && popup) {
    evt.preventDefault();
    if (popup.classList.contains("modal__show")) {
      popup.classList.remove("modal__show");
    }
  }
});

function changeImagePath(selector, state) {
  document.querySelector(selector).srcset = state;
};
function changeMainImage(selector, state) {
  document.querySelector(selector).src = state;
}

function doHeaderSticky() {
  header.classList.add('page-header__wrapper-sticky');
  changeImagePath(".js-logo-desktop-webp", 'img/logo-desktop-blue@1x.webp, img/logo-desktop-blue@2x.webp 2x');
  changeImagePath(".js-logo-tablet-webp", 'img/logo-tablet-blue@1x.webp, img/logo-tablet-blue@2x.webp 2x');
  changeImagePath(".js-logo-mobile-webp", 'img/logo-mobile-blue@1x.webp, img/logo-mobile-blue@2x.webp 2x');
  changeImagePath(".js-logo-desktop-png", 'img/logo-desktop-blue@1x.png, img/logo-desktop-blue@2x.png 2x');
  changeImagePath(".js-logo-tablet-png", 'img/logo-tablet-blue@1x.png, img/logo-tablet-blue@2x.png 2x');
  changeImagePath(".js-logo-main-img", 'img/logo-mobile-blue@2x.png 2x');
  changeMainImage(".js-logo-main-img", 'img/logo-mobile-blue@2x.png 2x');
}

function doHeaderStatic() {
  header.classList.remove("page-header__wrapper-sticky");
  changeImagePath(".js-logo-desktop-webp", 'img/logo-desktop-white@1x.webp, img/logo-desktop-white@2x.webp 2x');
  changeImagePath(".js-logo-tablet-webp", 'img/logo-tablet-white@1x.webp, img/logo-tablet-white@2x.webp 2x');
  changeImagePath(".js-logo-mobile-webp", 'img/logo-mobile-white@1x.webp, img/logo-mobile-white@2x.webp 2x');
  changeImagePath(".js-logo-desktop-png", 'img/logo-desktop-white@1x.png, img/logo-desktop-white@2x.png 2x');
  changeImagePath(".js-logo-tablet-png", 'img/logo-tablet-white@1x.png, img/logo-tablet-white@2x.png 2x');
  changeImagePath(".js-logo-main-img", 'img/logo-mobile-white@2x.png 2x');
  changeMainImage(".js-logo-main-img", 'img/logo-mobile-white@2x.png 2x');
}

document.addEventListener("scroll", function() {
  var scrollY = window.scrollY;
  console.log('State:', state);
  if (!state.isHeaderOpen) {
    if (scrollY > 0) {
      changeState('isHeaderSticky', true);
      doHeaderSticky();
    } else {
      changeState('isHeaderSticky', false);
      doHeaderStatic();
    }
  }
});
