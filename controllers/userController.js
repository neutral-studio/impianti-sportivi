const mongoose = require("mongoose");
const express = require('express');
const User = require('./../models/User');
const app = express();

/*Creating a new User*/
exports.createUser = (req, res) => {
    /*Getting data from forms*/
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cf: req.body.cf,
        email: req.body.email,
        role: req.body.role * 1,
        office: req.body.office
    }

    /*Actually creating the user*/
    User.create(newUser, (err, data) => {
        /*Returning an error*/
        if (err) {
            res.status(400).json({
                status: 'Fail',
                message: 'User could not be created'
            })

        } else {
            /*User created*/
            res.send('User has been created successfuly');
        }

    })

}

/*Creating the page*/
exports.get_create = (req, res) => {
    res.send('Create');
};

/*Editing the User*/
exports.editUser = (req, res) => {
    let id = req.params.id;
    /* Updating the user data*/
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cf: req.body.cf,
        email: req.body.email,
        role: req.body.role * 1,
        office: req.body.office
    };
    /*Reserch of the user by using the ID*/
    User.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'The user does not exist |  Invalid ID'
            });
        }
        data.replaceOne(updatedUser, err => {
            if (err) {
                /*Error case*/
                res.status(500).json({
                    status: 'invalid',
                    message: 'User could not be edited'
                });
            } else {
                /*Redirecting to skeleton page*/
                res.send('Edited');
            }
        });
    });
};

/* Editing the user */
exports.get_editUser = (req, res) => {
    Impianto.findById(req.params.id, (err, data) => {
        if (err) res.status(500).json({ status: 'fail' });
        res.send('Error,  NOT CREATED');
    });
};

/* Removing the user */
exports.removeUser = (req, res) => {
    console.log("EHI FRA");
    let id = req.params.id;

    User.deleteOne({ _id: id }, (err, data) => {
        /*Checks for any error*/
        if (err) {
            /*Status 500 error*/
            res.status(500).json({
                status: 'fail',
                message: 'User could not be deleted'
            });
        } else {
            /*Output*/
            res.send('User deleted succesfully');
        }
    });
};