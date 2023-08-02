const path = require('path');
const File = require('./schema');

module.exports = {
  saveFiles: async ({ archives }, pathToStorage) => {
    /**
     * Saves the files passed by parameter in the folder assigned as storage_vault
     * and persist it in database
     * @param archives - The file list
     * @return void
     */
    const promises = [];
    archives.forEach((archive) => {
      const storagePath = path.join(pathToStorage, archive.name);
      promises.push(archive.mv(storagePath));
      promises.push(File.create({
        absolutePath: storagePath,
        device: 'default',
      }));
    });
    await Promise.all(promises);
  },
};
