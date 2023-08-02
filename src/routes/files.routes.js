const router = require('express').Router();
const { saveFiles } = require('../controller/files.controller');

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
    return res.redirect('/');
  });
router.route('/')
  .get((req, res) => res.send('home'));

module.exports = router;
