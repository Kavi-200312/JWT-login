require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router  = require("./routes/routes");


try {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.use('/api',router)

    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`server connected ${port}`)
    })
} catch (error) {
    console.log(`${error.message}>>>>>>>>>>>>>server.js`);
}