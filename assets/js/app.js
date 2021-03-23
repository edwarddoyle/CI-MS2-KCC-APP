if (document.readyState !== "loading") documentReady();
else document.addEventListener("DOMContentLoaded", documentReady);

function documentReady() {
  changeAppView("home");
}

// Remove current view & replace with clicked
const navButton = document.querySelectorAll("nav ul li");
[...navButton].forEach((btn) => {
  btn.addEventListener(
    "click",
    (e) => {
      changeAppView(e.target.dataset.target);
      [...navButton].forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    },
    false
  );
});

// Main App Function for controlling view changes
function changeAppView(el) {
  let appShell = document.querySelector("main");
  let elementHolder = `<div class="row" id="${el}">
  </div>`;
  appShell.replaceChildren();
  appShell.insertAdjacentHTML("afterbegin", elementHolder);
  displayAppSection(el);
}

// Main App Function for displaying view changes
function displayAppSection(el) {
  import(`./${el}.js`).then((el) => {
    el.init(el);
  });
}

