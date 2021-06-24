const file = require("fs")
const path = require("path")
const jsonstringify = require("json-stringify-pretty-compact")

const cachefile = path.join(__dirname, "cache.json")

console.log("Setup Database..")
try {
    file.statSync(cachefile)
    console.log("Check File!")
} catch (err) {
    file.writeFile(cachefile, jsonstringify({
        "youtubelink": [],
    }), (err) => {
        if (err) {
            throw err
        } else {
            console.log("Setup Database!")
        }
    })
}

console.log("Read json..")
let cachejson = require("./cache.json")
console.log("Read json!")

function saveDatabase() {
    file.writeFile(cachefile, jsonstringify(cachejson), (err) => {
        if (err) {
            throw err
        }
    })
}

function setJSONCache(json) {
    cachejson = json
}

module.exports = {
    cachefile,
    cachejson,
    setJSONCache,
    saveDatabase
}
