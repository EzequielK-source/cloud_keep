const path = require('path');

module.exports = {
  saveFiles: async ({ archives }, pathToStorage) => {
    /**
     * Saves the files passed by parameter in the folder assigned as storage_vault
     *
     * @param archives - The file list
     * @return void
     */
    const promises = [];
    archives.forEach((archive) => {
      const storagePath = path.join(pathToStorage, archive.name);
      promises.push(archive.mv(storagePath));
      }));
    });
    await Promise.all(promises);
  },
};
