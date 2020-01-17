const mongoose = require('mongoose');
const express = require('express');
const Impianto = require('./../models/Impianto');

const app = express();


/* Get impianti page */
exports.get_impianti = (req, res) => {
    Impianto.find((err, data) => {
        if (err) {
            res.status(404).render('404');
        } else {
            res.render('admin_impianti', { impianti: data });
        }
    })
}


/* Creating a new Impianto */
exports.create = (req, res) => {
    /* Getting data from forms */
    const newImpianto = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        managementType: req.body.managementType * 1,
        manager: req.body.manager,
        imgs: req.body.imgs.replace(/\s+/g, '').split(','),
        tags: req.body.tags.replace(/\s+/g, '').split(',')
    };
     /* Split tags */ 
     for (var i=0; i < newImpianto.tags.length; i++) {
        newImpianto.tags[i] = newImpianto.tags[i].replace(/\s+/g, '').split('-');
    }
    /* Array to Object */
    var obj = {};
    newImpianto.tags.forEach(item => {
        item.forEach(function(val, i) {
            if (i % 2 === 1) return 
            if (item[i+1] == '') obj[val] = 'true';
            else obj[val] = item[i+1];
        })
    })
    newImpianto.tags = obj;

    /* Creating the Impianto */
    Impianto.create(newImpianto, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Impianto could not be created'
            });
        } else {
            /* Impianto created */
            /* res.send('Impianto has been created successfully'); */
            res.redirect('/');
        }
    })
};


/* Creating page */
exports.get_create = (req, res) => {
    res.render('newImpianto');
};


/* Editing an Impianto */
exports.edit = (req, res) => {
    let id = req.params.id;
    /* Updating the data */
    const updated = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        managementType: req.body.managementType * 1,
        manager: req.body.manager,
        imgs: req.body.imgs.replace(/\s+/g, '').split(','),
        tags: req.body.tags.replace(/\s+/g, '').split(',')
    };
    /* Split tags */ 
    for (var i=0; i < updated.tags.length; i++) {
        updated.tags[i] = updated.tags[i].replace(/\s+/g, '').split('-');
    }
    /* Array to Object */
    var obj = {};
    updated.tags.forEach(item => {
        item.forEach(function(val, i) {
            if (i % 2 === 1) return 
            if (item[i+1] == '') obj[val] = 'true';
            else obj[val] = item[i+1];
        })
    })
    updated.tags = obj;

    /* Research the Impianto by ID */
    Impianto.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'The impianto does not exist | Invalid ID'
            });
        }
        /* Replace data */
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'invalid',
                    message: 'Impianto could not be edited'
                });
            } else {
                /* Impianto edited */
               /*  res.send('Impianto has been edited successfully'); */
                res.redirect('/admin/impianti');
            }
        });
    });
};


/* Editing page */
exports.get_edit = (req, res) => {
    /* Research the Impianto by ID */
    Impianto.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'The impianto does not exist | Invalid ID'
            });
        }
        /* res.send('Edited impianto page'); */
        res.render('editImpianto', { impianto: data });
    });
};


/* Impianto page - user */
exports.get_impianto = (req, res) => {
    Impianto.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'The impianto does not exist | Invalid ID'
            });
        }
        res.send('okay');
    })
} 


/* Removing an Impianto */
exports.remove = (req, res) => {
    let id = req.params.id;
    /* Search and delete the Impianto by ID */
    Impianto.deleteOne( { _id: id}, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'The impianto could not be deleted'
            });
        } else {
            /* Impianto deleted */
            res.redirect('/admin/impianti');
        }
    });
};