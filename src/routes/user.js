const express = require('express');
const { signup, signin, getUsers, deleteUser, adminSignup, adminSignin } = require('../controllers/user');
// const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validator/auth');
const router = express.Router();


router.post('/user/signup', signup);
router.post('/user/signin', signin);
router.post('/admin/signup', adminSignup);
router.post('/admin/signin', adminSignin);
router.get('/user/list', getUsers);
router.delete('/user/delete/:id', deleteUser);


// router.post('/user/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;