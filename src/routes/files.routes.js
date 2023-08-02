const router = require('express').Router();

router
  .route('/upload')
  .get((req, res) => res.render('upload_file'))

module.exports = router;
