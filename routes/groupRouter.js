const express = require('express');

/*Requiring every other controller*/
const groupController = require('./../controllers/groupController');
const basicController = require('./../controllers/groupController');

/*Router*/
const router = express.Router();

/*The prefix for every route of this bunch is  "/admin/groups"*/

/*Creating Group*/
router
    .route('/create')
    .post(groupController.createGroup)
    .get(groupController.get_create);

/*Edit Group*/
router
    .route('/:id/edit')
    .post(groupController.editGroup)
    .get(groupController.get_editGroup);

router.route('/:id').delete(groupController.removeGroup);

module.exports = router;