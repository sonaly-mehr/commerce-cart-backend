const express = require('express');
const { createProduct, getProducts, singleProduct, deleteProduct, updateProduct } = require('../controllers/product');
const router = express.Router();
// const { requireSignin, adminMiddleware } = require('../common-middleware');
// const { addCategory, getCategories } = require('../controllers/category');
const multer = require('multer');
const shortid = require('shortid');
const path= require('path')

// router.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  
const upload = multer({ storage });

router.post('/product/create', upload.array('productPictures'), createProduct);
router.get('/product/list', getProducts);
router.get('/admin/product/list', getProducts);
router.get('/product/:id', singleProduct)
router.put('/product/update/:id', updateProduct);
router.delete('/product/delete/:id', deleteProduct);

// router.get('/category/list', getCategories);
module.exports = router;