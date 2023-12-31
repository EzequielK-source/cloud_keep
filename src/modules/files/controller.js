const path = require('path');
const File = require('./schema');

const persistFileIfNotExist = async ({ absolutePath, device }) => {
  /**
   * Persist an File in the database if they absolutePath is
   * not registered
   *
   */
  const existingFile = await File.findOne({ absolutePath });
  if (!existingFile) {
    await File.create({
      absolutePath,
      device,
    });
  }
};
const saveOneFile = async (archive, storageVault) => {
  /**
   * Save the file in the storage vault and persist it in the database
   *
   * if the file was previously saved in the database,
   * just rewrite the file in the storage vault
   * @param archives - The file(s) to save
   * @param storageVault - The absolute path to storage the file(s)
   */
  const storagePath = path.join(storageVault, archive.name);
  const archiveToPersist = {
    absolutePath: storagePath,
    device: 'mobile',
  };
  await archive.mv(storagePath);
  await persistFileIfNotExist(archiveToPersist);
};

const saveAllFilesInTheList = async (archiveList, storageVault) => {
  /**
   * Loop through the list of files using the saveOneFile function
   * @param archiveList - List of archives
   * @param storageVault - The absolute path to storage the file(s)
   */
  await Promise.all(
    archiveList.map((archive) => saveOneFile(archive, storageVault)),
  );
};
//
const fileController = {};
fileController.saveAndPersistFiles = async (archive, storageVault) => {
  /**
   * Saves the or the file passed by parameter in the storageVault
   * and persists them in the database
   *
   * If no file is sent, an exception is thrown
   * @param archives - The file(s) to save
   * @param storageVault - The absolute path to storage the file(s)
   * @error - 'No se envio ningun archivo'
   */
  if (Array.isArray(archive)) {
    await saveAllFilesInTheList(archive, storageVault);
  } else {
    await saveOneFile(archive, storageVault);
  }
};
module.exports = fileController;
