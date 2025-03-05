const express = require('express');
const users = express.Router();
const pool = require('../shared/pool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

users.post('/signup', async (req, res) => {
    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let pin = req.body.pin;
        let email = req.body.email;
        let password = req.body.password;

        pool.query(`select count(*) as count from users where email like '${email}'`,(err, result) => {
            if (err) {
                res.status(500).send({error: err.code, message: err.message});
            } else {
                const count = result?.[0]?.count;
                if (count > 0) {
                    res.status(200).send({message: 'email already exists'});
                } else {
                    bcrypt.hash(password, 10)
                        .then((hashedPassword) => {
                            const query = `insert into users (email, firstName, lastName, address, city, state, pin, password)
                                              values ('${email}','${firstName}','${lastName}','${address}','${city}','${state}','${pin}','${hashedPassword}')`;
                            pool.query(query, (err, result) => {
                                if (err) {
                                    res.status(500).send({error: err.code, message: err.message});
                                } else {
                                    res.status(200).send({message: 'success'});
                                }
                            })
                        })
                }
            }
        })
    } catch (ex) {
        res.status(400).send({error: ex.code, message: ex.message});
    }
});

users.post('/login', async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let query = `select * from users where email like '${email}'`;

        pool.query(query,(err, result) => {
            if (err) {
                res.status(500).send({error: err.code, message: err.message});
            } else {
                console.log(query);
                console.log(result);
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password).then((compareResult) => {
                        if (compareResult) {
                            const token = jwt.sign(
                                {
                                    id: result[0].id,
                                    email: result[0].email,
                                },
                                'estore-secret-key',
                                { expiresIn: '1h' }
                            );

                            res.status(200).send({
                                token: token,
                                expiresInSeconds: 3600,
                                user: {
                                    firstName: result[0].firstName,
                                    lastName: result[0].lastName,
                                    address: result[0].address,
                                    pin: result[0].pin,
                                    city: result[0].city,
                                    state: result[0].state,
                                    email: result[0].email,
                                }
                            });
                        } else {
                            res.status(401).send({message: 'invalid password'});
                        }
                    })
                } else {
                    res.status(401).send({message: 'user doesnt exist'});
                }
            }
        })
    }
    catch (error) {
        res.status(400).send({error: error.code, message: error.message});
    }
})

module.exports = users;