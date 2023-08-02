const File = require('../src/modules/files/schema');

const utils = {};
utils.createFakeFile = async (fakePath, index) => File.create({
  absolutePath: fakePath + index,
  device: 'test',
});

utils.createNfakeFiles = async (n) => {
  const promises = Array.from({ length: n }, (_, index) => utils.createFakeFile('/fake/path', index));
  await Promise.all(promises);
};
utils.deleteAllFiles = async () => {
  await File.deleteMany({});
};
module.exports = utils;
