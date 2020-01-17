const mongoose = require("mongoose");
const express = require('express');
const Group = require('./../models/Group');
const app = express();
exports.get_create = (req, res) => {

}

/*Creating a new Group*/
exports.createGroup = (req, res) => {
    /*Getting data from forms*/
    const newGroup = {
        name: req.body.name,
        address: req.body.address,
        sports: req.body.sports.replace(/\s+/g, '').split(','),
        activities: req.body.activities.replace(/\s+/g, '').split(','),
        contact: req.body.contact,
    }

    /*Actually creating the user*/
    Group.create(newGroup, (err, data) => {
        /*Returning an error*/
        if (err) {
            res.status(400).json({
                status: 'Fail',
                message: 'Group could not be created'
            })

        } else {
            /*Group created*/
            res.status(201).json({
                status: 'success',
                data: data
            })
        }
    })
}

/*Creating the page*/
exports.get_create = (req, res) => {
    res.send('Created');
};

/*Editing the group*/
exports.editGroup = (req, res) => {
    let id = req.params.id;
    /* Updating the group data*/
    const updatedGroup = {
        name: req.body.name,
        address: req.body.address,
        sports: req.body.sports.replace(/\s+/g, '').split(','),
        activities: req.body.activities.replace(/\s+/g, '').split(','),
        contact: req.body.contact
    };
    /*Reserch of the group by using the ID*/
    Group.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'The group does not exist |  Invalid ID'
            });
        }
        data.replaceOne(updatedGroup, err => {
            if (err) {
                /*Error case*/
                res.status(500).json({
                    status: 'invalid',
                    message: 'Group could not be edited'
                });
            } else {
                /*Redirecting to skeleton page*/
                res.status(201).json({
                    status: 'success',
                    data: updatedGroup
                })
            }
        });
    });
};

/* Editing the group */
exports.get_editGroup = (req, res) => {
    Impianto.findById(req.params.id, (err, data) => {
        if (err) res.status(500).json({ status: 'fail' });
        res.send('Error,  NOT CREATED');
    });
};

/*Removing the group */
exports.removeGroup = (req, res) => {
    let id = req.params.id;

    Group.deleteOne({ _id: id }, (err, data) => {
        /*Checks for any error*/
        if (err) {
            /*Status 500 error*/
            res.status(500).json({
                status: 'fail',
                message: 'Group could not be deleted'
            });
        } else {
            /*Output*/
            res.send('Group deleted succesfully');
        }
    });
}

