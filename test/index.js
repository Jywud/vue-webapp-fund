var express = require('express')
var mockJson = require('./data.json')
var router = express.Router();

for (let key in mockJson) {
    router.post('/'+key, (req, res) => {
        res.json({
            error: 0,
            data: mockJson[key]
        });
    });
}

module.exports = router;