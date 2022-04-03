const Order = require('../models/order');

exports.createOrder = (req, res) => {

  Order.findOne({email: req.body.email})
  .exec((error, order)=> {
    if(error) return res.status(400).json({error});
    if(order){

      Order.findOneAndUpdate({ email: req.body.email },{
        "$push": {
          // "address": req.body.address,
          "product": req.body.product
        }
      }) 
      .exec((error, _order)=> {
        if(error) return res.status(400).json({error});
        if(_order){
          return res.status(201).json({order: _order})
        }
      })
    }
    else{
       // const {fullName, email, contactNumber, address, paymentId, productId, productName, productPrice, quantity } = req.body;
      const order = new Order({

      fullName: req.body.fullName,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      address: req.body.address,
      paymentId: req.body.paymentId,
      product: req.body.product
  });
  order.save((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(201).json({ order });
      }
    });
    }
  })
};

exports.getOrders = (req, res) => {
  Order.find({ email: (req.params.email)})
    // .select("_id paymentStatus paymentType orderStatus items")
    // .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};