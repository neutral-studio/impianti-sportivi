const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const Impianto = require('./../models/Impianto');

const app = express();


exports.create = (req, res) => {
    const newImpianto = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport,
        managementType: req.body.managementType,
        manager: req.body.manager,
        imgs: req.body.imgs,
        tags: req.body.tags
    }
    Impianto.create(newImpianto, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: "Errore nella creazione dell'impianto"
            });
        }
        res.redirect('./../../impianti');
    })
};


exports.get_create = (req, res) => {
    /* req.flash('success', 'Impianto aggiunto con successo'); */
    res.render('');
};


exports.edit = (req, res) => {
    let id = req.params.id;
    const updated = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        managementType: req.body.managementType*1,
        manager: req.body.manager,
        imgs: req.body.imgs.replace(/\s+/g, '').split(','),
        tags: req.body.tags
    };
    Impianto.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: "L'impianto non esiste | ID non valido"
            });
        }
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: "L'impianto non può essere modificato"
                });
            } else {
                /* req.flash('success', 'Impianto "' + updated.name + '" modificato con successo'); */
                res.redirect('/impianti');
            }
        });
    });
};


exports.get_edit = (req, res) => {
    Impianto.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: "L'impianto non esiste | ID non valido"
            });
        }
        res.render('', { impianto: data });
    });
};


exports.remove = (req, res) => {
    let id = req.params.id;
    Impianto.deleteOne( { _id: id}, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: "Fallimento nell'eliminazione dell'impianto"
            });
        } else {
            /* req.flash('danger', 'Hai eliminato un impianto'); */
            res.redirect('/impianti');
        }
    });
};