const path = require('path');
const router = require('express').Router();
const { saveAndPersistFiles } = require('./controller');
const File = require('./schema');

const storageVault = path.join(__dirname, '../../../storage_vault');
// Upload route
router
  .route('/upload')
  .post(async (req, res) => {
    /**
     * Run the task saveAndPersistFiles and render the template explorer,
     * if at least 1 file has not been sent,
     * the template explorer is rendered with the error: 'no file was selected'
     *
     */
    try {
      await saveAndPersistFiles(req.files.archives, storageVault);
      return res.redirect('/files/explorer');
    } catch (err) {
      return res.status(400).render('error', {
        error: err,
      });
    }
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
module.exports = router;
