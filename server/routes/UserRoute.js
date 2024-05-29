const { getUserById, updateUser } = require("../controllers/UserController");
const router = require("express").Router();

router.get("/:userId", getUserById);
router.put("/:userId", updateUser);

module.exports = router;
