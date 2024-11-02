const { default: mongoose } = require("mongoose")

const connectionDb = ()=>{
    try {
        const data_db = mongoose.createConnection(process.env.MONGO_DB)
        console.log(`database is conncted`)
        return data_db;
    } catch (error) {
        console.log(`${error.message}>>>>>>>>>>>>database.js`)
    }
}

module.exports = connectionDb();