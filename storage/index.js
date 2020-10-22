// Requires
const fs = require("fs"),
  path = require("path");

module.exports = {
  // Retorna la data obtenida desde el archivo data.json
  getDataAll: () => {
    let dataPath = __dirname + path.join("/data/data.json");
    // Promesa
    return new Promise((resolve, reject) => {
      fs.readFile(dataPath, "utf8", (err, readData) => {
        if (err) reject(err);
        resolve(JSON.parse(readData));
      });
    });
  },
};
