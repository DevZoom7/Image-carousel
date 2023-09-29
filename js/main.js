// * Elements

const carousel = document.querySelector(".carousel");
const imageWrapper = carousel.querySelector(".carousel__image-wrapper");
const paginationArrows = carousel.querySelectorAll(".carousel__pagination-arrows i");
const paginationDotsWrapper = carousel.querySelector(".carousel__pagination-dots");

// * Global Variables

const ACTIVE_CLASS = "active";
const DISABLED_CLASS = "disabled";

const diameter = parseFloat(
   window.getComputedStyle(paginationDotsWrapper).getPropertyValue("height")
);
const gap = 10;
const widthTakenByDot = diameter + gap;

const images = [
   "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1457459686225-c7db79d4e59f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1683009427042-e094996f9780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
   "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&h=427&q=80",
];

const lastImageIndex = images.length - 1;

let activeImage = 0;
let img = createImage(0);
let startX;
let offsetX;

const DURATION = {
   EXIT: 100,
   ENTER: 200,
};

// * Adding Other Elements
// ? First Image

imageWrapper.append(img);

// ? Pagination Dots

for (let ind = 0; ind <= lastImageIndex; ind++) {
   const dot = document.createElement("span");
   dot.textContent = ind + 1;
   if (ind === 0) {
      dot.classList.add(ACTIVE_CLASS);
   }
   dot.addEventListener("click", () => handleDotClick(ind));
   paginationDotsWrapper.append(dot);
}

const paginationDots = paginationDotsWrapper.querySelectorAll("span");

// * Helpful Functions

/**
 * @param {number} imageNumber
 * @returns
 */

function getImg(imageIndex) {
   return images[imageIndex];
}

/**
 * @param {string} leftPosition
 * @returns {HTMLImageElement}
 */

function createImage(leftPosition) {
   const img = document.createElement("img");
   const src = getImg(activeImage);
   img.setAttribute("src", src);
   img.setAttribute("alt", "img");
   img.setAttribute("draggable", "false");
   img.style.setProperty("left", px(leftPosition));
   return img;
}

/**
 * @param {number} increment
 * @param {boolean} replace
 */

function updateActiveImage(increment, replace) {
   if (replace === true) {
      activeImage = increment;
      return;
   }
   const newActiveImage = activeImage + increment;
   if (newActiveImage > lastImageIndex) {
      activeImage = 0;
   } else if (newActiveImage < 0) {
      activeImage = lastImageIndex;
   } else {
      activeImage = newActiveImage;
   }
}

/**
 * @param {number} position
 */

function setLeft(position) {
   img.style.setProperty("left", px(position));
}

/**
 * @param {number} duration
 */

function setDuration(duration) {
   img.style.setProperty("transition-duration", `${duration}ms`);
}

/**
 * @param {boolean} isAvailable
 */

function setAvailability(availability) {
   if (availability === false) {
      imageWrapper.classList.add(DISABLED_CLASS);
      return;
   }
   imageWrapper.classList.remove(DISABLED_CLASS);
}

/**
 * @param {boolean} availability
 */

function resetPosition(availability) {
   setDuration(DURATION.ENTER);
   setLeft(0);
   setTimeout(() => {
      setDuration(0);
      setAvailability(availability);
   }, DURATION.ENTER);
}

/**
 * @param {number} ind
 */

function setActiveDot(ind) {
   paginationDots.forEach((dot) => {
      dot.classList.remove(ACTIVE_CLASS);
   });
   paginationDots[ind].classList.add(ACTIVE_CLASS);
}

/**
 * @param {number} increment
 * @param {boolean} replace
 */

function scrollCarousel(increment, replace) {
   setAvailability(false);
   let direction;
   if (replace === true) {
      direction = increment > activeImage ? 1 : -1;
   } else {
      direction = increment;
   }
   updateActiveImage(increment, replace);
   const { width: wrapperWidth } = imageWrapper.getBoundingClientRect();
   const newImg = createImage(wrapperWidth * direction);
   imageWrapper.append(newImg);
   setDuration(DURATION.EXIT);
   setLeft(-wrapperWidth * direction);
   setTimeout(() => {
      img.remove();
      img = newImg;
      resetPosition(true);
   }, DURATION.EXIT);
   setActiveDot(activeImage);
   paginationDotsWrapper.scrollTo({
      behavior: "smooth",
      left:
         activeImage * widthTakenByDot - (direction === 1 ? widthTakenByDot : widthTakenByDot * 4),
   });
}

/**
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns {number}
 */

function minmax(min, value, max) {
   return Math.max(min, Math.min(value, max));
}

/**
 * @param {string | number} value
 * @returns {string}
 */

function px(value) {
   return `${value}px`;
}

// * Event Handlers

imageWrapper.addEventListener("pointerdown", handlePointerDown);
imageWrapper.addEventListener("pointerup", handlePointerUp);

/**
 * @param {PointerEvent} e
 */

function handlePointerDown(e) {
   offsetX = 0;
   img.setPointerCapture(e.pointerId);
   startX = e.clientX;
   imageWrapper.addEventListener("pointermove", handlePointerMove);
}

/**
 * @param {PointerEvent} e
 */

function handlePointerMove(e) {
   const { clientX: endX } = e;
   const MAX_OFFSET = 300;
   offsetX = endX - startX;
   setLeft(minmax(-MAX_OFFSET, offsetX, MAX_OFFSET));
}

function handlePointerUp() {
   imageWrapper.removeEventListener("pointermove", handlePointerMove);
   let direction;
   const REQUIRED_OFFSET = 100;
   if (offsetX < -REQUIRED_OFFSET) {
      direction = 1;
   } else if (offsetX > REQUIRED_OFFSET) {
      direction = -1;
   } else {
      resetPosition();
      return;
   }
   scrollCarousel(direction);
}

paginationArrows.forEach((arrow) => {
   arrow.addEventListener("click", handleArrowClick);
});

/**
 * @param {MouseEvent} e
 */

function handleArrowClick(e) {
   const node = e.target;
   const direction = Number(node.getAttribute("data-direction"));
   scrollCarousel(direction);
}

/**
 * @param {number} ind
 */

function handleDotClick(ind) {
   if (ind !== activeImage) {
      scrollCarousel(ind, true);
   }
}

document.addEventListener("keydown", handleKeyDown);

/**
 * @param {KeyboardEvent} e
 */

function handleKeyDown(e) {
   if (e.key === "ArrowRight") {
      scrollCarousel(1);
   } else if (e.key === "ArrowLeft") {
      scrollCarousel(-1);
   } else if (e.key === "ArrowUp" && activeImage !== 0) {
      scrollCarousel(0, true);
   } else if (e.key === "ArrowDown" && activeImage !== lastImageIndex) {
      scrollCarousel(lastImageIndex, true);
   }
}
