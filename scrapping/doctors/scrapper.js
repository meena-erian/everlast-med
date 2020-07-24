/**
 * @file scrapper.js
 * @summary This is a client-size JavaScript code meant to automatically
 *  collect the list of doctors in Everlast Medical Center as
 *  listed on https://www.everlastwellness.com/our-team/
 */

let docsDivs = Array.from(document.querySelectorAll("div[class*='member-item']"));

let teamObj = {};
let teamArr = [];

docsDivs.forEach((docDiv) => {
    let img = docDiv.querySelector('img').src;
    let name = docDiv.querySelector("h5").firstChild.textContent;
    let title = docDiv.querySelector("h5").firstElementChild.innerText;
    let link = docDiv.querySelector("strong").querySelector("a").href;
    teamObj[name] = {title : title, image : img, link: link};
    teamArr.push({
        name : name,
        title : title,
        image : img,
        link : link,
    });
})
