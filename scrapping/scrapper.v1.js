/**
 * @file scrapper.js
 * @summary This is aclient-size JavaScript code meant to automatically
 *  collect the list of services provided by Everlast Medical Center as
 *  listed on https://www.everlastwellness.com/
 */


let categoryList = document.querySelector("#menu-item-2609").children[1].children; //HTMLCollection(12)
categoryList = Array.from(categoryList);

let Services = {};

let warn = (msg) => {
    console.log(`%c "${msg}"`, 'background: yellow; color: black;')
}
let err = (msg) => {
    console.log(`%c "${msg}"`, 'background: red; color: yellow;')
}
let scream = (msg) => {
    console.log(`%c "${msg}"`, 'background: black; color: white;')
}
let ack = (msg) => {
    console.log(`%c "${msg}"`, 'background: green; color: black;')
}

categoryList.forEach(async (cetegoryElement) => {
    let catName = cetegoryElement.firstElementChild.innerText;
    let catPagelink = cetegoryElement.firstElementChild.href;
    let catPage = false;
    let r = await fetch(catPagelink);
    if (r) {
        catPage = document.createElement("html");
        catPage.innerHTML = await r.text();
    }
    else {
        scream(`Failed to fetch category page for "${catName}"!`);
    }
    let summaryDivs = Array.from(catPage.querySelectorAll(`div[class*=service-box]`));

    summaryDivs.forEach(async (serviceDiv) => {
        let serviceName = serviceDiv.querySelector("h4").firstElementChild.innerText;
        let serviceLink = serviceDiv.querySelector("h4").firstElementChild.href;
        Services[serviceName] = {
            category: catName
        };
        let serviceImg = serviceDiv.querySelector("img");
        if (serviceImg) serviceImg = serviceImg.src;
        Services[serviceName].image = serviceImg;
        if(!Services[serviceName].image){
            err(`Failed to find images for service "${serviceName}" under catedory "${catName}"`);
        }
        else {
            ack(`Found image for "${serviceName}" under "${catName}"!`);
        }
        Services[serviceName].description = Array.from(serviceDiv.querySelectorAll('p')).map((p) => p.innerText).join(' ');
        if (!Services[serviceName].description && Services[serviceName].description.length < 11) {
            warn(`Failed to find description for "${serviceName}" in the category page under category: "${catName}"! Loading service page instead...`)
            let r = await fetch(serviceLink);
            if (r) {
                let servicePage = document.createElement("html");
                servicePage.innerHTML = await r.text();
                let possibleTabImage = servicePage.querySelector(`img[src='${Services[serviceName].image}']`);
                if (possibleTabImage) {
                    Services[serviceName].description =
                        possibleTabImage.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
                }
                else {
                    let possibleDescription = servicePage.querySelector("p").parentElement.innerText;
                    if (possibleDescription.length < 1000)
                        Services[serviceName].description = possibleDescription;
                }
                if (!Services[serviceName].description || Services[serviceName].description.length < 11) {
                    err(`Unable to find description for "${serviceName}"!! Category: "${catName}" `);
                }
            }
            else {
                scream(`Failed to fetch '${serviceLink}' for "${serviceName}"`);
            }
        }
        else {
            ack(`Found description for "${serviceName}" under "${catName}"!`);
        }
    });
});