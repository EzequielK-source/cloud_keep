const express = require("express");

const app = express();

const FilesRouter = require("./routes/files.routes");

app.use("/files", FilesRouter);
module.exports = app;
