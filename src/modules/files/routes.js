const path = require('path');
const router = require('express').Router();
const { saveFiles, saveFile } = require('./controller');
const File = require('./schema');

const storageVault = path.join(__dirname, '../../../storage_vault');
// Upload route
router
  .route('/upload')
  .post(async (req, res) => {
    /**
     * Record and persist the sended files and
     * redirect to files view
     */
    if (!req.files || req.files.length < 1) {
      return res.redirect('/explorer');
    }
    if ('length' in req.files.archives) {
      await saveFiles(req.files, storageVault);
    } else {
      await saveFile(req.files, storageVault);
    }
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
