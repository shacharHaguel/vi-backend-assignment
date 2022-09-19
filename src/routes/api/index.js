const router = require("express").Router();

router.use("/", require("./actorsApi"));
router.use("/", require("./moviesApi"));

module.exports = router;
