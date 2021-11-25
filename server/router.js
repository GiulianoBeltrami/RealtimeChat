const { request, response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/',(request,response) => {
    res.send({ response: "Server is up and running." }).status(200);
})

module.exports = router;