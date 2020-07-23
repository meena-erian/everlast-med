
const fs = require("fs");

let Services = JSON.parse(fs.readFileSync('./scrapped-services.json'));

let keys = Object.keys(Services)

let array = [];

keys.forEach((key) => {
    array.push({
        title: key,
        ...Services[key]
    });
});

fs.writeFileSync('services.json' , JSON.stringify(array, null, 2));