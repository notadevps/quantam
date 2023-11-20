const express = require('express'); 
const router = express.Router(); 
const verifyJwt = require('../utils/verifyJwt');

router.post('/view', verifyJwt, (req, res) => res.status(200).json('done')); 


module.exports = router; 