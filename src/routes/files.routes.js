const router = require('express').Router();

router
  .route('/upload')
  .get((req, res) => res.render('upload_file'))
  .post(async (req, res) => {
    /**
     * Record and persist the sended files and
     * redirect to files view
     */
    if (!req.files) {
      return res.statusCode(400);
    }
    await saveFiles(req.files);
    return res.redirect('/home');
  });

module.exports = router;
