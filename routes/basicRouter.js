const express = require('express');

const router = (express.Router());

const basicController = require('./../controllers/basicController');

router.route('/').get(basicController.get_home);

module.exports = router;