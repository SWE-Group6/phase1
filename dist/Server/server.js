"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use('/api', routes_1.router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
