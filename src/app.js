require('./db');
const path = require('path');
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const FilesRouter = require('./modules/files/routes');
const appRouter = require('./router');

app.use('/files', FilesRouter);
app.use('/', appRouter);
module.exports = app;
