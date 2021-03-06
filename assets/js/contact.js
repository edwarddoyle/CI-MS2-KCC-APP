import {
  showLoadingButton,
  hideLoadingButton,
  rememberNewVisitor,
  showToast,
  displayHeaderText,
} from "./utils.js";

export function init() {
  displayHeaderText("Contact");
  let contactFormHTML = `<div class="box">
  <form autocomplete="off" id="contactForm" >
     <ol>
        <li>
           <label for="name">Name</label>
           <input type="text" name="name" id="name" placeholder="e.g. Joe Bloggs" required />
        </li>
        <li>
           <label for="email">Email</label>
           <input type="email" name="email" id="email" placeholder="e.g. joe@bloggs.com" required />
        </li>
        <li>
           <label for="message">Message</label>
           <textarea  name="message" form="contactForm" id="message" required></textarea>
        </li>
        <li class="flexEnd">
           <a id="openFeedbackModal" aria-describedby="new-window-message">Would you like to leave feedback?</a>
        </li>
        <li class="flexEnd">
           <button type="submit">SUBMIT</button>
        </li>
     </ol>
  </form>
</div>
<div class="box">
  <ol class="contactDetails">
     <li><img src="assets/images/kcc.svg" width="300" height="110" alt="Kilmacow Community Cleanup Logo"></li>
     <li><i class="icon-web"></i><a href="https://edwarddoyle.github.io/CI-MS1-KCC/index.html" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Website">KCC Website</a></li>
     <li><i class="icon-location" aria-hidden="true"></i>Upper Kilmacow, Co.Kilkenny</li>
     <li><i class="icon-call" aria-hidden="true"></i><a href="tel:00000000">+353 12 345 6789</a></li>
     <li><i class="icon-mail" aria-hidden="true"></i><a href="mailto:contact@kcc.ie">contact@kcc.ie</a></li>
     <li>
        <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Facebook">
        <i class="icon-facebook" aria-hidden="true"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Twitter">
        <i class="icon-twitter" aria-hidden="true"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Instagram">
        <i class="icon-instagram" aria-hidden="true"></i>
        </a>
     </li>
  </ol>
</div>
`;

  document
    .querySelector("#contact")
    .insertAdjacentHTML("afterbegin", contactFormHTML);

  let contactForm = document.querySelector("#contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Remember Visitor
    let inputName = document.querySelector("#name").value;
    let firstName = inputName.split(" ")[0].trim();
    rememberNewVisitor(firstName);

    let submitButton = document.querySelector("button");
    showLoadingButton(submitButton);
        let emailBody = [];
    // Loop over form to get values
    [...contactForm.elements].forEach((el) => {
        let name = String(el.name);
        let value = el.value.trim();
        emailBody = [...emailBody, { name: name, data: value }];        
    });

    Email.send({
      SecureToken: "dd05546f-ea67-4f1a-8825-4d3c9ba272e9",
      To: "edwardpaul.doyle@gmail.com",
      From: "edwardpaul.doyle@gmail.com",
      Subject: "New KCC Message",
      Body: emailBody,
    }).then(resetForm());

    function resetForm() {
      hideLoadingButton(submitButton);
      contactForm.reset();
      showToast("success", "Message Sent");
     }
  });

  let feedbackButton = document.querySelector("#openFeedbackModal");
  feedbackButton.addEventListener("click", (e) => {
    e.preventDefault;
    let feedbackFormPopup = `
      <form class="feedbackForm" id="feedbackForm">      
        <ol>
          <h2>Feedback</h2>
          <li><div class="rating star"></div></li>
          <li><div class="rating emoji"></div></li>
          <li><div class="rating number"></div></li>
          <li>
            <label for="feedbackmessage">We appreciate your feedback...</label>
            <textarea  name="feedbackmessage" form="feedbackForm" id="feedbackmessage"></textarea>
          </li>
          <li>
            <button type="submit" id="submitFeedback">Submit Feedback</button>
          </li>
        </ol>
      </form>`;
    document
      .querySelector("#contact")
      .insertAdjacentHTML("afterbegin", feedbackFormPopup);

    let feedbackInputs = [
      {
        name: "star",
        icon: "&#9734;",
        question: "How would you rate the overall site design",
      },
      {
        name: "emoji",
        icon: "&#x1F610;",
        question: "How happy are you with website features",
      },
      {
        name: "number",
        icon: "&#931",
        question: "How difficult is the website to navigate",
      },
    ];

    feedbackInputs.forEach((input) => {
      let feedbackform = document.querySelector(`.rating.${input.name}`);
      let startNumber, icon, endNumber;
      startNumber = input.name === "number" ? 2 : 1;
      endNumber = input.name === "number" ? 7 : 6;
      while (startNumber < endNumber) {
        icon = input.name === "number" ? input.icon + startNumber : input.icon;
        addToFeedbackForm(feedbackform, input.name, icon, startNumber);
        startNumber++;
      }
      feedbackform.insertAdjacentHTML("afterbegin", `<p>${input.question}</p>`);
      feedbackform.insertAdjacentHTML("beforeend", `<div class="clear"></div>`);
    });

    function addToFeedbackForm(t, n, i, sn) {
      let inputName = `<input id="${n}${sn}" name="${n}" type="radio" value="${sn}" class="radio-btn hide" />
       <label for="${n}${sn}">${i}</label>`;
      t.insertAdjacentHTML("afterbegin", inputName);
    }

    let feedbackFormSubmit = document.querySelector("#submitFeedback");
    feedbackFormSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      let feedbackForm = document.getElementById("feedbackForm");

    let emailBody = [];
    [...feedbackForm.elements].forEach((el) => {
      if (el.type === "radio" && !el.checked) {
          return
        }        
          let name = String(el.name);
          let value = el.value.trim();
          emailBody = [...emailBody, { name: name, data: value }];    
      });
  
      Email.send({
        SecureToken: "dd05546f-ea67-4f1a-8825-4d3c9ba272e9",
        To: "edwardpaul.doyle@gmail.com",
        From: "edwardpaul.doyle@gmail.com",
        Subject: "New KCC Feedback",
        Body: emailBody,
      }).then(resetForm());
  
      function resetForm() {
        hideLoadingButton(feedbackFormSubmit);
        showToast("success", "Message Sent");
        feedbackButton.textContent = "Thank you for your feedback";
        feedbackForm.parentNode.removeChild(feedbackForm);
       }
    });
  });
}
