const path = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const FilesRouter = require('./routes/files.routes');

app.use('/files', FilesRouter);
module.exports = app;
