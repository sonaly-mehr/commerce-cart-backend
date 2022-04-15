const User = require('../models/user');
const bcrypt = require('bcrypt');
var ObjectId = require('mongodb').ObjectId;

// const generateJwtToken = (_id, role) => {
//     return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//   };

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User already exist!'
        });
        const { firstName, lastName, email, password, contactNumber} = req.body;
        
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            contactNumber
        })
        _user.save((error, data) => {
            if(data){
                return res.status(201).json({
                    message: 'User created Sucessfully!'
                })
            }
            if(error){
                console.log(error);
                return res.status(400).json({
                    message: 'Something went wrong'
                    
                });
            }
            
        })
    })
}

exports.adminSignup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    // User.estimatedDocumentCount(async (err, count) => {
    //   if (err) return res.status(400).json({ error });
    //   let role = "";
    //   if (count === 0) {
    //     role = "admin";
    //   }

      const { firstName, lastName, email, password, contactNumber } = req.body;
      // const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        password,
        contactNumber,
        role: 'admin'
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  // });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword && user.role === "user") {
          
          res.send({message: "Login Sucessfull", user: user})
        } else {
          res.send({message: "Password didn't match"})
        }
      }
       else {
        res.send({message: "User not registered"})
      }
    });
  };

  exports.adminSignin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword && user.role === "admin") {
          
          res.send({message: "Login Sucessfull", user: user})
        } else {
          res.send({message: "Password didn't match"})
        }
      }
       else {
        res.send({message: "Admin not registered"})
      }
    });
  };


exports.getUsers = async (req, res) => {
    const users = await User.find()
    .exec();
    res.status(200).json(users);
  };

  exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: ObjectId(req.params.id) }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
        else {
          res.status(400).json({ error: "Params required" });
        }
    });

  };

  exports.getSingleUser = async (req, res) => {
    // const products = await Product.find()
    // .exec();
    // res.status(200).json(products);

    const id = ObjectId(req.params.id);
    const user = await User.find({ _id: id })
    .exec();
    res.status(200).json(user);

  }

  exports.updateUser = (req, res) => {
    User.findOne({ _id: ObjectId(req.params.id) }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
        else{
          if (!result) {
            res.status(404).send();
          }
          else{
            if(req.body.firstName){
              result.firstName= req.body.firstName;
            }
            if(req.body.lastName){
              result.lastName= req.body.lastName;
            }
            if(req.body.email){
              result.email= req.body.email;
            }
            if(req.body.password){
              result.password= req.body.password;
            }
            if(req.body.contactNumber){
              result.contactNumber= req.body.contactNumber;
            }
            // if(req.body.category){
            //   result.category= req.body.category;
            // }
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

  exports.searchUser = async (req, res) => {
    // const key = req.params.key;
    const data = await User.find({ 
      "$or":[
        {"firstName":{$regex:req.params.key}},
        {"lastName":{$regex:req.params.key}},
        {"email":{$regex:req.params.key}}
    ]
     })
     res.send(data);

  }