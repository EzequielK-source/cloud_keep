const path = require('path');
const router = require('express').Router();
const { saveFiles } = require('../controller/files.controller');

const storageVault = path.join(__dirname, '../../storage_vault');
router
  .route('/upload')
  .get((req, res) => res.render('upload_file'))
  .post(async (req, res) => {
    /**
     * Record and persist the sended files and
     * redirect to files view
     */
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.statusCode(400);
    }
    await saveFiles(req.files);
    return res.redirect('/');
  });
router.route('/')
  .get((req, res) => res.send('home'));

module.exports = router;
