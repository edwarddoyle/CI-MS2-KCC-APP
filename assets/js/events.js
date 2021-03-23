import { noData, displayHeaderText } from "./utils.js";
export async function init() {
  displayHeaderText("Events");
  let eventCardsUrl = "assets/docs/events.json";
  try {
    let response = await fetch(eventCardsUrl, {
      method: "GET",
    });
    let data = await response.json();
    if (response.ok && data.length) {
      data.forEach((event) => {
        displayEventCards(event);
      });
    } else {
      noData("events");
    }
  } catch (err) {
    noData("events");
  }

// Display Event Cards
  function displayEventCards(event) {
    let eventCard = `<details class="slideInLeft">
          <summary>
            <ol><li>${event.day}</li><li>${event.month}</li></ol>
            <ol>
                <li>${event.name}</li>
                <li><i class="icon-location" aria-hidden="true"></i>${event.location}</li>
                <li><i class="icon-time" aria-hidden="true"></i>${event.time}</li>
                <li><i class="icon-person" aria-hidden="true"></i>${event.info}</li>
                <li><i class="icon-info" aria-hidden="true"></i></li>
            </ol>      
          </summary>
          <p>${event.description}</p>
    </details>`;
    document
      .querySelector("#events")
      .insertAdjacentHTML("afterbegin", eventCard);
  }
}
