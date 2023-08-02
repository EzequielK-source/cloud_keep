const path = require('path');

const storageVault = path.join(__dirname, '../../storage_vault');
module.exports = {
  saveFiles: async ({ archives }) => {
    /**
     * Saves the files passed by parameter in the folder assigned as storage_vault
     *
     * @param archives - The file list
     * @return void
     */
    const storagePath = path.join(storageVault, archives.name);
    await archives.mv(storagePath);
  },
};
