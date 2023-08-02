const mongoose = require('mongoose');

const { Schema } = mongoose;
const fileSchema = new Schema({
  absolutePath: { type: String, required: true, unique: true },
  device: { type: String, required: true },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
