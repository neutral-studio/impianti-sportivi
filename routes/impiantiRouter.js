const express = require('express');
const impiantiController = require('./../controllers/impiantiController');

const router = express.Router();


/* The prefix for every route on this page is '/admin/impianti' */


/* Create an Impianto */
router
    .route('/create')
    .get(impiantiController.get_create)
    .post(impiantiController.create);


/* Edit an Impianto */
router
    .route('/:id/edit')
    .get(impiantiController.get_edit)
    .post(impiantiController.edit);
    

/* Delete an Impianto*/
router
    .route('/:id')
    .delete(impiantiController.remove);


/* Impianti page */
router
    .route('/')
    .get(impiantiController.get_impianti);


/* Exporting router model */
module.exports = router;