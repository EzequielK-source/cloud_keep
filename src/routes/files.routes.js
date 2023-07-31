const router = require("express").Router();

router.route("/upload").get((req, res) => {
  return res.send("hola");
});

module.exports = router;
