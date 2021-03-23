import { returnVisitor, returnVisitorName } from "./utils.js";

export function init() {
  displayGreeting();

  (function displayHome() {
    let homeHTML = `<div class="box">
    <ol class="contactDetails slideInLeft">
       <li><img src="assets/images/kcc.svg" width="300" height="110" alt="Kilmacow Community Cleanup Logo"></li>
       <li><i class="icon-web"></i><a href="https://edwarddoyle.github.io/CI-MS1-KCC/index.html" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Website">KCC Website</a></li>
       <li><i class="icon-location" aria-hidden="true"></i>Upper Kilmacow, Co.Kilkenny</li>
       <li><i class="icon-call" aria-hidden="true"></i><a href="tel:00000000">+353 12 345 6789</a></li>
       <li><i class="icon-mail" aria-hidden="true"></i><a href="mailto:contact@kcc.ie">contact@kcc.ie</a></li>
       <li><a href="https://www.facebook.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Facebook">
          <i class="icon-facebook" aria-hidden="true"></i></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Twitter">
          <i class="icon-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Instagram">
          <i class="icon-instagram" aria-hidden="true"></i>
          </a>
       </li>
    </ol>
 </div>
 <div class="box welcomeText">
    <p>
       Welcome, and thank you for taking the time to try the Kilmacow Community Clean Up App. 
       Currently the app is in its development and feedback stage, and we are hoping that you, the user could provide us with as much feedback as possible, so together we can transform this App into an excellent tool for all members of our community.
    </p>
    <p>So, what are we looking for feedback on? Well, everything basically. From the colour scheme to the navigation, the functionality and features, any issues or errors that may arise while you use the app and of course, a NAME! We have added a basic feedback form on the Contact Section or you can go rogue and provide feedback in the main form on the Contact Section.
    </p>
    <p>So, what does the app do I hear you ask? Well, the Reports Section provides you with a feature for reporting ‘blackspots for litter’, ‘areas for improvement’ and general issues in the community that the Community Clean Up Group could address or forward onto the appropriate authorities, such as the local council. Once you add a report, we will receive it by email. The report will also be stored so you can look back on any previous reports you created. </p>
    <p class="notify"> <i class="icon-location" aria-hidden="true"></i> <em>When you navigate to the reports section, the app will ask you for permission to use your location. This will allow us to identify the exact location of the issue you are reporting. You will only be asked for this permission the first time you use this app.
       </em>
    </p>
    <p>The Events Section displays all upcoming scheduled events. We are currently working on a feature to allow you share these events and add them to your devices calendar – please bear with us!</p>
    <p>The Contact Section allows you to contact us and also provide feedback on the app, did I mention that we would really appreciate this 😊.</p>
    <p>So, feel free to navigate around, play with things, 
       try to break things and have a peak in our code cupboards. 
       If you landed here by accident, that’s cool too. If you would like 
       to find out more information about the Kilmacow Community Clean Up Group, then please <a href="https://edwarddoyle.github.io/CI-MS1-KCC/index.html" target="_blank" rel="noopener" aria-describedby="new-window-message" aria-label="Website">click here, clickity click.</a>
    </p>
 </div>`;
    document.querySelector("#home").insertAdjacentHTML("afterbegin", homeHTML);
  })();

  function displayGreeting() {
    let time = new Date().getHours();
    let greeting =
      time < 10 ? "Good morning" : time < 20 ? "Good day" : "Good evening";
    let greetingMessage = returnVisitor
      ? `${greeting} ${returnVisitorName}`
      : `Welcome`;
    let greetingHolder = `<div class="row slideInDown greeting">${greetingMessage}</div>`;
    document
      .querySelector("main")
      .insertAdjacentHTML("afterbegin", greetingHolder);
  }
}
