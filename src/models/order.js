const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
      // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      // contactNumber: { type: String, required:true},
      address: { 
        country: {type: String, required: true},
        city: {type: String, required: true},
        street: {type: String, required: true},
        postal: {type: String, required: true}

       },
      paymentId: { type: String, required: true  },
      product: [
        {
          productId: {type: String, required: true},
          productName: {type: String, required: true},
          productPrice: {type: Number, required: true},
          quantity: {type: Number, default:1}
        }
      ]
      
    },
    { timestamps: true }
  );
  
module.exports = mongoose.model("Order", orderSchema);