const appRouter = require('express').Router();

appRouter.get('/', (req, res) => res.render('home'));

module.exports = appRouter;
