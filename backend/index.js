const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
require('dotenv').config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());

//Available Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));
app.get("/", (req, res) => {
    res.send("APP IS RUNNING.");
});

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});