const express = require('express');
const router  = express.Router();

const {getPinCode} = require('../controllers/getPinCode');

/*
router.get('/newroute', (req, res, next) => {
    res.status(200).send('This is a new ROUTE!');
});
*/

router.get('/verify', (req, res, next) => {
    const newPin = getPinCode();
    return res.status(200).json({newPin});
});

module.exports = router;