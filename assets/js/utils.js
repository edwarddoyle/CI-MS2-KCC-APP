export const currentView = document.querySelector("main");
import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'

/* Acknowledgement - addToLocalStorageObject & getFromLocalStorageObject were inspired by 
Chris Ferdinandi localStorage and sessionStorage helper library: https://github.com/cferdinandi/bin */
export let addToLocalStorageObject = function (name, key, value) {
  let existing = localStorage.getItem(name);
  existing = existing ? JSON.parse(existing) : {};
  existing[key] = value;
  localStorage.setItem(name, JSON.stringify(existing));
};

export let getFromLocalStorageObject = function (name, key) {
  let existing = localStorage.getItem(name);
  existing = existing ? JSON.parse(existing) : {};
  let value = existing[key];
  return value;
};

export function noData(el) {
  let noDataImg = `<img src='assets/images/${el}.svg' alt='no data to display' width="250"/>`;
  document.getElementById(el).insertAdjacentHTML("afterbegin", noDataImg);
}

export function showLoadingButton(el) {
  let spinner = `<div class="spinner"></div>`;
  el.textContent = "";
  el.insertAdjacentHTML("afterbegin", spinner);
}

export function hideLoadingButton(el) {
  el.textContent = "SUBMIT";
  el.querySelectorAll("*").forEach((n) => n.remove());
}

//https://codepen.io/kipp0/pen/pPNrrj?editors=1010
// export function showToast(status, message) {
//   let icon = status === "success" ? `fas fa-search` : `fas fa-search`;
//   let toast = `<div id="toast"><i class="${icon}"></i>${message}</div>`;
//   currentView.firstChild.insertAdjacentHTML("afterbegin", toast);
//   let toastID = document.getElementById("toast");
//   setTimeout(() => toastID.parentNode.removeChild(toastID), 3000);
// }
export function showToast(status, message) {
  let icon = status === "success" ? `icon-check` : `icon-close`;
  let toast = `<div id="toast" class="overlay"><div class="popup">
    <i class="${icon}"></i>${message}
  </div></div>`;
  currentView.insertAdjacentHTML("afterbegin", toast);
  let toastID = document.getElementById("toast");
  setTimeout(() => toastID.parentNode.removeChild(toastID), 2000);
}



export function rememberNewVisitor(name) {
  let returnVisitor = getFromLocalStorageObject("appSettings", "returnVisitor");
  if (!returnVisitor) {
    addToLocalStorageObject("appSettings", "name", name);
    addToLocalStorageObject("appSettings", "returnVisitor", true);
  }
}

export const returnVisitor = getFromLocalStorageObject(
  "appSettings",
  "returnVisitor"
);

export const returnVisitorName = getFromLocalStorageObject(
  "appSettings",
  "name"
);

export function displayHeaderText(el) {
  let header = `<div class="row slideInDown pageHeader">${el}</div>`;
  document.querySelector("main").insertAdjacentHTML("afterbegin", header);
}

export let swiperOptions = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}


export function validateFile(file) {
  const allowedMimeTypes = ['jpg', 'png'];
  let fileMime = file.name.split(".").pop().toLowerCase();
  if (!allowedMimeTypes.includes(fileMime)) {
    /* console.log(`Allowed file types include: ${allowedMimeTypes.join(',  ')} : ${file.name} will not be posted`) */
    return;
  }
}

export function addToFilestoSwiper(file, i) {
  let fileSrc = URL.createObjectURL(file);
  let uploadImageSwiper = `<div class="swiper-slide">
   <img src="${fileSrc}" width="150px" loading="lazy"/>
   </div>`;
  let swiperContainer = document.querySelector('.swiper-container')
  let swiper = new Swiper(swiperContainer, swiperOptions);
  swiper.appendSlide([uploadImageSwiper]);
}

export function addImagesToReport(img, container){
  let slideImg = `<div class="swiper-slide"><img src="${img}" width="150px"></div>`; 
  let reportSwiper = new Swiper(container, swiperOptions);
  reportSwiper.appendSlide([slideImg]); 
}

export const filesToUpload = [];
export function handleFiles(files) {
  const set = new Set([...files]);
  const array = [...set];
  array.forEach((file) => {
    validateFile(file)
    addToFilestoSwiper(file);
    getBase64(file).then(
      data => filesToUpload.push(data)
    );
  })
}

// Acknowledgement joshua.paling - October 2019 https://stackoverflow.com/a/46639837/10741662
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
