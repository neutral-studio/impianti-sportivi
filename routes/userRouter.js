const express = require('express');

/*Requiring every other controller*/
const basicController = require('./../controllers/basicController');
const userController = require('./../controllers/userController');

/*Router*/
const router = express.Router();

/*The prefix for every route of this bunch is  "/admin/users"

/*Create User*/
router
    .route('/create')
    .post(userController.createUser)
    .get(userController.get_create);

/*Edit User*/
router
    .route('/:id/edit')
    .post(userController.editUser)
    .get(userController.get_editUser);


/*Delete User*/
router
    .route('/:id')
    .delete(userController.removeUser);

/*Exporting router model*/
module.exports = router;