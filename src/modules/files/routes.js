const path = require('path');
const router = require('express').Router();
const { saveFiles } = require('./controller');
const File = require('./schema');

const storageVault = path.join(__dirname, '../../../storage_vault');
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
      return res.redirect('/upload');
    }
    await saveFiles(req.files, storageVault);
    return res.redirect('/');
  });

router.get('/explorer', async (req, res) => {
  /**
   * Renders the 'explorer_files' template with all the files inside the user's folder
   */
  const data = {
    files: await File.find(),
  };
  return res.render('explorer_files', data);
});
// lists files route
router.route('/')
  .get((req, res) => res.send('home'));

module.exports = router;
