const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middleweres/auth");
const {
  getAllUsers,
  changeStatus,
  changeRole,
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  saveOrder,
  getOrder,
} = require("../controller/user");

router.get("/users", authCheck, adminCheck, getAllUsers); // get all users
router.post("/change-status", authCheck, adminCheck, changeStatus); // change user status
router.post("/change-role", authCheck, adminCheck, changeRole); // change user role

router.post("/user/cart", authCheck, userCart); // add to cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // delete from cart

router.post("/user/address", authCheck, saveAddress); // add address

router.post("/user/order", authCheck, saveOrder); // create order
router.get("/user/order", authCheck, getOrder); // get order

module.exports = router;
