// import express
const express = require('express');
const router = express.Router();
const { createCategory,listCategory,deleteCategory } = require('../controller/category');
const { authCheck, adminCheck} = require('../middleweres/auth')
router.post('/category',authCheck, adminCheck, createCategory);
router.get('/category', listCategory);
router.delete('/category/:id',authCheck, adminCheck, deleteCategory);

module.exports = router 
