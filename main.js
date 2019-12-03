// Name: Jaimie Jin
// Date: May 1, 2019
// Section: CSE 154 AE
//
// This is the main.js page for my dogs page.

(function() {
  "use strict";

  const URL_BASE = "https://dog.ceo/api/breeds/";
  /**
   *  Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   *  makes a button and waits for the button to be clicked
   */
  function init() {
    id("random").addEventListener("click", makeRequest);
  }

  /**
   * Fetches a random image of a dog.
   */
  function makeRequest() {
    //let url = URL_BASE;
    let url = URL_BASE + "image/random";
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(successFunction)
      .catch(errorFunction);
  }

  /**
   * successFunction shows the image that is retrieved
   *  @param {object} responseData - the data recieved and parsed from the fetch
   */
  function successFunction(responseData) {
      clearCanvas();
      let img = document.createElement("img");
      img.src = responseData.message;
      let alt = responseData.message.substring(30);
      let index = alt.indexOf("/");
      alt = alt.substring(0, index);
      img.alt = alt;
      qs("h1").innerText = "It's a(n) " + alt + "!";
      img.id = "result";
      qs("main").appendChild(img);
  }

  /**
   * clearCanvas removes the present img or text
   */
  function clearCanvas() {
    qs("main").removeChild(qs("main").lastElementChild);
  }

  /**
   * errorFunction shows users that an image was able to get retrieved.
   */
  function errorFunction(){
    clearCanvas();
    let p = document.createElement("p");
    p.innerText = "Oh no!! The dog ran away! Try again later...";
    p.id = "result";
    qs("h1").innerText = "ERROR!!!";
    qs("main").appendChild(p);
  }
  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @returns {object} - valid result text if response was successful, otherwise rejected
   *                     Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

})();
