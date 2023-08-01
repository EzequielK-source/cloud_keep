const router = require("express").Router();

router.route("/upload").get((req, res) => {
  return res.render("upload_file");
});

module.exports = router;
