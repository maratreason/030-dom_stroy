const swiper = new Swiper(".swiper-main-slider", {
  // navigation: {
  //     nextEl: ".main-slider__btn",
  // },
  // autoplay: {
  //   delay: 10000,
  //   loop: true,
  // },
});

const swiper_offers = new Swiper(".offer-slider", {
  navigation: {
    prevEl: ".offer-slider__btn--left",
    nextEl: ".offer-slider__btn--right",
  },
  loop: false,
  autoplay: {
    speed: 10000,
  },
  breakpoints: {
    1920: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
    },
  },
});

const abs_slider = new Swiper(".abs-slider", {
  slidesPerView: 1,
  pagination: {
    el: ".abs-slider-pagination",
    clickable: true,
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return `<span class="abs-slider-num">${current + "/" + total}</span>`;
    },
  },
  navigation: {
    nextEl: ".abs-slider__btn.abs-slider__btn--right",
    prevEl: ".abs-slider__btn.abs-slider__btn--left",
    disabledClass: "abs-slider__btn--inactive",
  },
});

abs_slider.on("reachEnd", function () {});

const swiper_slider = new Swiper(".ours-slider", {
  slidesPerView: 4,
  pagination: {
    el: ".ours-slider-pagination",
    clickable: true,
    type: "custom",
    renderCustom: function (swiper, current, total) {
      return `
        <button class="abs-slider__btn abs-slider__btn--left">
            <img src="images/icons/chevron-line-left.svg" alt="" />
        </button>
        <span class="abs-slider-num">${current + "/" + total}</span>
        <button class="abs-slider__btn abs-slider__btn--right">
            <img src="images/icons/chevron-line-right.svg" alt="" />
        </button>
      `;
    },
  },
  navigation: {
    nextEl: ".ours-slider__btn--right",
    prevEl: ".ours-slider__btn--left",
  },
});

const subcatalog_details_slider = new Swiper(".subcatalog-main__slider-swiper", {
  slidesPerView: 4,
  spaceBetween: 8,
  navigation: {
    nextEl: ".subcatalog-main__btn--right",
    prevEl: ".subcatalog-main__btn--left",
  },
});

const reviews_slider = new Swiper(".reviews-slider", {
  slidesPerView: 3,
  spaceBetween: 20,
  slideActiveClass: "reviews-slider__item--active",
  slidesPerGroupSkip: 1,
  centeredSlides: true,
  initialSlide: 1,
  loop: true,
  navigation: {
    nextEl: ".reviews-slider__btn--right",
    prevEl: ".reviews-slider__btn--left",
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
});

const burgerBtn = document.querySelector("[data-adaptive-menu-trigger]");
const burgerMenu = document.querySelector("[data-adaptive-menu]");
if (burgerBtn && burgerMenu) {
  burgerBtn.addEventListener("click", () => {
    burgerBtn.querySelector(".burger").classList.toggle("is--active");
    burgerMenu.classList.toggle("is--active");
  });
}

const pictureSlider = (selector) => {
  const root = document.querySelector(selector);
  const bigPicture = root.querySelector("[data-picture-big]");
  const smallPictures = root.querySelectorAll("[data-picture-small] img");

  if (smallPictures) {
    smallPictures.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.src) {
          bigPicture.src = e.target.src;
        }
      });
    });
  }
};

const picSlider = document.querySelector("[data-subcatalog-slider]");
if (picSlider) {
  pictureSlider("[data-subcatalog-slider]");
}

/**
 * Select input script
 */
const selects = document.querySelectorAll("[data-select]");

if (selects) {
  selects.forEach((select) => {
    select.addEventListener("click", (e) => {
      e.preventDefault();
      const list = select.querySelector(".select__list");
      const icon = select.querySelector("[data-select-icon]");
      const current = select.querySelector(".select__current span");

      select.querySelectorAll(".select__item").forEach((el) => {
        if (current.textContent === el.textContent) {
          el.classList.add("select__item--active");
        }
      });

      list.classList.toggle("show");
      icon.style.transform = "rotate(180deg)";

      if (list.classList.contains("show")) {
        icon.style.transform = "rotate(180deg)";
      } else {
        icon.style.transform = "rotate(0deg)";
      }

      if (e.target.classList.contains("select__item")) {
        current.textContent = e.target.textContent;
        select.querySelectorAll(".select__item").forEach((el) => el.classList.remove("select__item--active"));
        e.target.classList.add("select__item--active");
        list.classList.remove("show");
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

/**
 * Range slider
 */
function rangeSlider(selector, symbol) {
  const parent = document.querySelector(selector);

  if (parent) {
    const rangeInput = parent.querySelectorAll(".aside-block__range-input input");
    const priceInput = parent.querySelectorAll(".aside-block__price-input .field input");
    const progress = parent.querySelector(".aside-block__range .slider .progress");
    let priceGap = 10;
    const minPrice = parent.querySelector(".input-min");
    const maxPrice = parent.querySelector(".input-max");

    progress.style.left = (parseInt(rangeInput[0].value) / rangeInput[0].max) * 100 + "%";
    progress.style.right = 100 - (parseInt(rangeInput[1].value) / rangeInput[1].max) * 100 + "%";

    // range data
    if (rangeInput) {
      rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInput[0].value);
          let maxVal = parseInt(rangeInput[1].value);

          if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
              rangeInput[0].value = maxVal - priceGap;
            } else {
              rangeInput[1].value = minVal + priceGap;
            }
          } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;

            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            minPrice.value = minVal + ` ${symbol}`;
            maxPrice.value = maxVal + ` ${symbol}`;
          }
        });
      });
    }

    // input field data
    if (priceInput) {
      priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(priceInput[0].value);
          let maxVal = parseInt(priceInput[1].value);

          if (maxVal - minVal >= priceGap && maxVal <= 10000) {
            if (e.target.classList.contains("input-min")) {
              rangeInput[0].value = minVal;
              progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            } else if (e.target.classList.contains("input-max")) {
              rangeInput[1].value = maxVal;
              progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }

            minPrice.textContent = minVal + ` ${symbol}`;
            maxPrice.textContent = maxVal + ` ${symbol}`;
          }
        });
      });
    }
  }
}

rangeSlider(".aside-block__price", "₽");
rangeSlider(".aside-block__square", "㎡");

/**
 * Modal script
 */
const modal = ($trigger, $modal, $backdrop, $activeClass, $close) => {
  if ($trigger && $modal && $backdrop && $activeClass && $close) {
    const modalTriggers = document.querySelectorAll($trigger);
    const modal = document.querySelector($modal);
    const backdrop = document.querySelector($backdrop);
    const close = modal.querySelector($close);

    if (modalTriggers) {
      modalTriggers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // modal.style.top = (e.pageY - 400) + "px";
          backdrop.classList.add($activeClass);
          modal.classList.add($activeClass);
        });
      });

      backdrop.addEventListener("click", (e) => {
        backdrop.classList.remove($activeClass);
        modal.classList.remove($activeClass);
      });

      close.addEventListener("click", () => {
        backdrop.classList.remove($activeClass);
        modal.classList.remove($activeClass);
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
};

modal("[data-show-modal]", "[data-modal]", ".backdrop", "is--active", "[data-modal-close]");
modal("[data-show-modal-2]", "[data-modal-2]", ".backdrop", "is--active", "[data-modal-close]");
modal("[data-show-modal-3]", "[data-modal-3]", ".backdrop", "is--active", "[data-modal-close]");
modal("[data-show-modal-4]", "[data-modal-4]", ".backdrop", "is--active", "[data-modal-close]");

if (document.querySelector("[data-show-modal-5]")) {
  modal("[data-show-modal-5]", "[data-modal-5]", ".backdrop", "is--active", "[data-modal-close]");
}

// Заказать звонок
modal("[data-show-modal-6]", "[data-modal-6]", ".backdrop", "is--active", "[data-modal-close]");

/**
 * Data size check buttons script
 */
const checkButtons = () => {
  const btns = document.querySelectorAll("[data-size-btn]");

  if (btns) {
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        e.target.classList.contains("is--active")
          ? e.target.classList.remove("is--active")
          : e.target.classList.add("is--active");
      });
    });
  }
};

checkButtons();

const accordion = (parentSelector) => {
  const parent = document.querySelector(parentSelector);

  if (parent) {
    const title = parent.querySelectorAll("[data-accordion-title-id]");
    const desc = parent.querySelectorAll("[data-accordion-desc-id]");

    title.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        if (desc[index]) {
          if (title[index].dataset.accordionTitleId === desc[index].dataset.accordionDescId) {
            desc[index].classList.add("is--active");
          }
        } else {
          desc[index].classList.remove("is--active");
        }
      });
    });
  }
};

accordion("[data-accordion-info]");

/**
 * Stepper script
 */
const steps = document.querySelectorAll("[data-step]");

if (steps) {
  steps.forEach((step, index) => {
    step.addEventListener("click", (e) => {
      const dataStep = e.target.closest(".subcatalog-work__item");

      if (dataStep.dataset.step > index + 1) {
        steps.forEach((s) => s.classList.remove("active"));
        step.classList.toggle("active");
      } else if (dataStep.dataset.step == 1) {
        step.classList.toggle("active");
        steps.forEach((s, idx) => {
          if (idx >= dataStep.dataset.step) {
            steps[idx].classList.remove("active");
          }
        });
      } else if (dataStep.dataset.step <= index + 1) {
        steps.forEach((s, idx) => {
          if (idx <= index) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      }
    });
  });
}
