const express=require('express');
const router=express.Router();
const {login, register, getAllUsers, updateUserRole}=require('../controller/user')
const {verifyToken, isAdmin}=require('../middleware/auth')


router.post('/', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update', verifyToken, isAdmin,updateUserRole);
module.exports=router;