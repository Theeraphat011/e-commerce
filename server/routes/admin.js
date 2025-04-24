const express = require("express");
const router = express.Router();
const { authCheck } = require("../middleweres/auth");
const { changeOrderStatus, getOrderAdmin } = require("../controller/admin");

router.put("/admin/orders-status", authCheck, changeOrderStatus);
router.get("/admin/orders", authCheck, getOrderAdmin);

module.exports = router;
