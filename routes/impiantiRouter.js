const express = require('express');
const impiantiController = require('./../controllers/impiantiController');

const router = express.Router();


router
    .route('/create')
    .post(impiantiController.create)
    .get(impiantiController.get_create);

router
    .route('/:id/edit')
    .get(impiantiController.get_edit)
    .post(impiantiController.edit);

router
    .route('/:id')
    .delete(impiantiController.remove);