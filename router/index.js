const express = require('express');
const router  = express.Router();

router.get('/newroute', (req, res, next) => {
    res.status(200).send('This is a new ROUTE!');
})

module.exports = router;