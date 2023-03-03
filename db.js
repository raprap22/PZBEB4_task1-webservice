const fs = require('fs')
const path = require('path')
const dbPath = path.resolve(__dirname, './data.json')

function getDataDB() {
    let data = fs.readFileSync(dbPath)
    data = data.toString('utf-8')
    return JSON.parse(data)
}

function create(bodyData) {
    const data = getDataDB()
    data.push(bodyData)
    fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: 'utf-8' })
    return bodyData
}

module.exports = {
    create
}