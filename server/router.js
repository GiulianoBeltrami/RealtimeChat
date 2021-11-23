const { request, response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/',(request,response) => {
    response.send('Tudo ok');
})

module.exports = router;