const {
  getContactUs,
  setContactUs,
} = require("../controllers/ContactUsController");
const router = require("express").Router();

router.get("/", getContactUs);
router.post("/", setContactUs);

module.exports = router;
