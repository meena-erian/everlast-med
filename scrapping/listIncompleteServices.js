
const fs = require("fs");

let Services = JSON.parse(fs.readFileSync('./scrapped-services.json'));

let keys = Object.keys(Services)

let empty = [];

keys.forEach((key) => {
    if(!Services[key].description || !Services[key].image) 
        empty.push(key); 
});

fs.writeFileSync('incomplete-information.json' , JSON.stringify(empty, null, 2));