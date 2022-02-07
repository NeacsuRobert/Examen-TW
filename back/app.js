const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./sequelize")

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

const PORT = 8080;

const virtualShelfRouter = require("./routes/VirtualShelf")
app.use("/api", virtualShelfRouter)

const bookRouter = require("./routes/Book")
app.use("/api", bookRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`);
})