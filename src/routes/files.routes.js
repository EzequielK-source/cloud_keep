const path = require('path');
const router = require('express').Router();
const { saveFiles } = require('../controller/files.controller');
const File = require('../models/file.schema');

const storageVault = path.join(__dirname, '../../storage_vault');
// Upload route
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
    await saveFiles(req.files, storageVault);
    await File.create({
      absolutePath: storageVault,
      device: 'default',
    });
    return res.redirect('/');
  });

router.get('/explorer', async (req, res) => {
  /**
   * Renders the 'explorer_files' template with all the files inside the user's folder
   */
  const data = {};
  return res.render('explorer_files');
});
// lists files route
router.route('/')
  .get((req, res) => res.send('home'));

module.exports = router;
