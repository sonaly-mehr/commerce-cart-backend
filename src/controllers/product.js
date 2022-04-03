const Product = require('../models/product');
const slugify = require('slugify');
const shortid = require('shortid');
var ObjectId = require('mongodb').ObjectId;

exports.createProduct = (req, res) => {

    const {name, price, brand, description, quantity, category } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: 'http://localhost:4000/public/' + file.filename };
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        brand,
        quantity,
        description,
        category,
        productPictures
    });
    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(201).json({ product, files: req.files });
        }
      });
};

exports.getProducts = async (req, res) => {
    const products = await Product.find()
    .exec();
    res.status(200).json(products);
  };

exports.singleProduct = async (req, res) => {
    // const products = await Product.find()
    // .exec();
    // res.status(200).json(products);

    const id = ObjectId(req.params.id);
    const products = await Product.find({ _id: id })
    .exec();
    res.status(200).json(products);

  };

  exports.updateProduct = (req, res) => {
    Product.findOne({ _id: ObjectId(req.params.id) }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
        else{
          if (!result) {
            res.status(404).send();
          }
          else{
            if(req.body.name){
              result.name= req.body.name;
            }
            if(req.body.brand){
              result.brand= req.body.brand;
            }
            if(req.body.description){
              result.description= req.body.description;
            }
            if(req.body.price){
              result.price= req.body.price;
            }
            if(req.body.quantity){
              result.quantity= req.body.quantity;
            }
            if(req.body.category){
              result.category= req.body.category;
            }
          }
        }
        result.save(function(err, updateResult) {
          if(err){
            console.log(err);
            res.status(500).send();
          }
          else{
            res.send(updateResult);
          }
        })
    });

  };

  exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: ObjectId(req.params.id) }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
        else {
          res.status(400).json({ error: "Params required" });
        }
    });

  };