const express = require('express');
const { createOrder, getOrders } = require('../controllers/order');
const router = express.Router();


router.post('/user/orders', createOrder);
// router.post('/user/signin', signin);
router.get('/user/order/list', getOrders );
// router.delete('/user/delete/:id', deleteUser);

module.exports = router;