const express = require('express');
const router  = express.Router();

const {getPinCode} = require('../controllers/getPinCode');
const {getApplicant} = require('../controllers/getApplicant');

router.get('/newroute', (req, res, next) => {
    res.status(200).send('This is a new ROUTE!');
});

router.get('/verify', (req, res, next) => {
    const newPin = getPinCode();
    return res.status(200).json({newPin});
});

router.get('/applicant', (req, res, next) => {
    getApplicant(1)
        .then(data => {
            console.log('data::', data);
            return res.status(200).json({data});
        })
        .catch(err => {
            console.log('ERROR::', err);
            return res.json({err});

        })

});

module.exports = router;