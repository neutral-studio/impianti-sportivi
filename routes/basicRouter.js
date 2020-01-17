const express = require('express');

const router = (express.Router());

const basicController = require('./../controllers/basicController');

router.route('/').get(basicController.get_home);


/*Redirecting to the home route*/
router.route('/index').get((req, res) => {
    res.redirect('/');
});

/*Redirecting to the home route*/

router.route('/home').get((req, res) => {
    res.redirect('/');
});

module.exports = router;