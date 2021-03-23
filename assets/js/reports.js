import {
  showLoadingButton,
  hideLoadingButton,
  addToLocalStorageObject,
  displayHeaderText,
  noData,
  handleFiles,
  filesToUpload,
  addImagesToReport
} from "./utils.js";

// Form For Creating Report
function displayReportForm() {
  let reportFormHTML = `<form id="reportForm" class="feedbackForm" autocomplete="off" >
    <div class="row">
      <div class="box">
        <ol>
          <li><h3>New Report</h3></li>
          <li><label for="desc">Description</label>
              <input type="text" name="desc" id="desc" />
          </li>
          <li class="flexEnd">
              <input type="file" id="fileElem" name="images" accept="image/*" multiple/>
              <label class="button" for="fileElem"><i class="icon-camera"></i></label>
          </li>
        </ol>
      </div>
      <div class="box swiperContainer">            
        <div class="swiper-container">
          <div class="swiper-wrapper"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
      <div class="box" id="currentLocation"></div>
      <div class="box">   
        <ol>
          <li class="flexEnd">
            <button type="submit" id="submitReport">Submit</button>
          </li>
        </ol>         
      </div>
    </div>    
</form>`;

  document
    .querySelector("#reports")
    .insertAdjacentHTML("afterbegin", reportFormHTML);

  //Create object for localstorage
  const reportObject = new Object();

  let form = document.querySelector("form");

  //Get User Location
  const locationContainer = document.querySelector("#currentLocation");
  (function getLocation() {
    if (navigator.geolocation) {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(getPosition, geoError, options);
    } else {
      locationContainer.textContent =
        "Geolocation is not supported by this browser.";
    }
  })();

  function getPosition(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    let map = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=200x200&scale=2&maptype=roadmap&markers=color:red%7C${latitude},${longitude}%7Csize:tiny&key=AIzaSyC6KUfzZQmB1JDTcRvtLOzvCwI5Y1DG1QI`;
    let currentLocation = `<img loading="lazy" src="${map}"/>`;
    locationContainer.insertAdjacentHTML("afterbegin", currentLocation);
    reportObject.map = map;
  }

  function geoError(err) {
    locationContainer.textContent = `ERROR(${err.code}): ${err.message}`;
    reportObject.map = "assets/images/nomap.svg";
  }

  // Validate Files on input change
  let fileInput = form.querySelector('input[type="file"]');
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      handleFiles(fileInput.files);
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let submitButton = form.querySelector("#submitReport");
    showLoadingButton(submitButton);

    // Add Values To Report Object
    reportObject.id = Date.now();
    reportObject.reportDate = new Date().toLocaleDateString("en-GB");
    reportObject.images = [];

    let emailAttachments = [];
    let emailBody = [];

    filesToUpload.forEach((file, i) => {
      emailAttachments = [...emailAttachments, { name: [i], data: file }];
      reportObject.images.push(file);
    });

    // Loop over form to get values
    [...form.elements].forEach((el) => {
      if (el.type === "text") {
        let name = String(el.name);
        let value = el.value.trim();
        emailBody = [...emailBody, { name: name, data: value }];
        reportObject[`${name}`] = `${value}`;
      }
    });

    // Add Report Object to Local Storage
    addToLocalStorageObject("reports", reportObject.id, {
      date: reportObject.reportDate,
      map: reportObject.map,
      desc: reportObject.desc,
      images: reportObject.images,
    });

    // Email form using SMTP.js
    Email.send({
      SecureToken: "dd05546f-ea67-4f1a-8825-4d3c9ba272e9",
      To: "edwardpaul.doyle@gmail.com",
      From: "edwardpaul.doyle@gmail.com",
      Subject: "New KCC Report",
      Body: emailBody,
      Attachments: emailAttachments,
    }).then(resetForm());

    function resetForm() {
      hideLoadingButton(submitButton);
      let swiperContainer = document.querySelector(".swiper-container");
      swiperContainer.querySelectorAll("*").forEach((n) => n.remove());
      form.reset();
      form.parentNode.removeChild(form);
    }
  });
}

export async function init() {
  displayNewReportCta();
  displayHeaderText("Reports");
  displayReportCards();

  // Display Previous Reports From Local Storage
  async function displayReportCards() {
    let data = localStorage.getItem("reports");
    if (data) {
      try {
        let reports = await JSON.parse(data);
        for (let [key, value] of Object.entries(reports)) {
          let html = `<article id="${key}">
            <img src="${value.map}"/>
              <ul><h3>Report</h3>
                <li><i class="icon-date"></i>${value.date}</li>
                <li><i class="icon-info"></i>${value.desc}</li>
                <li class="slideHolder">
                  <div id="slide${key}" class="swiper-container">
                  <div class="swiper-wrapper"></div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                  </div>
                </li>       
              </ul>
          </article>`;
          document
            .querySelector("#reports")
            .insertAdjacentHTML("afterbegin", html);
            if (value.images){
              let imageSlider = document.querySelector(`#slide${key}`);
              value.images.forEach((img) => {
                addImagesToReport(img, imageSlider);
             })
            }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      noData("reports");
    }
  }

  // CTA for display Report Form
  function displayNewReportCta() {
    let ctaButton = `<a href="#" id="newReport" class="float" aria-describedby="new-window-message">
      <i class="icon-flag"></i>
    </a>`;
    document
      .querySelector("#reports")
      .insertAdjacentHTML("afterbegin", ctaButton);
    newReport.addEventListener("click", (e) => {
      e.preventDefault();
      displayReportForm();
    });
  }
}
