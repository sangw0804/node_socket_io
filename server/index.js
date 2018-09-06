const path = require("path");
const express = require("express");
const app = express();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// // GET /
// app.get("/", (req, res) => {
//     res.send("../public/index");
// });

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`now listening at :${port}`);
});