const express = require('express');
const { signup, signin, getUsers, deleteUser, adminSignup, adminSignin, updateUser, getSingleUser, searchUser } = require('../controllers/user');
const User = require('../models/user');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth');
const router = express.Router();


router.post('/user/signup', signup);
router.post('/user/signin', signin);
router.post('/admin/signup', adminSignup);
router.post('/admin/signin', adminSignin);
router.get('/user/list', getUsers);
router.get('/user/:id', getSingleUser);
router.delete('/user/delete/:id', deleteUser);
router.put('/user/update/:id', updateUser);
router.get('/search/user/:key', searchUser)
// router.get('/search/user/:key', async (req, res) => {
//     let data = await User.find(
//         {
//             "$or":[
//                 {"firstName":{$regex:req.params.key}},
//                 {"lastName":{$regex:req.params.key}},
//                 {"email":{$regex:req.params.key}}
//             ]
//         }
//     )
//     res.send(data);
// });


// router.post('/user/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;