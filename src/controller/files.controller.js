const path = require('path');

module.exports = {
  saveFiles: async ({ archives }, pathToStorage) => {
    /**
     * Saves the files passed by parameter in the folder assigned as storage_vault
     *
     * @param archives - The file list
     * @return void
     */
    const storagePath = path.join(pathToStorage, archives.name);
    await archives.mv(storagePath);
  },
};
