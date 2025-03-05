const express = require('express');
const orders = express.Router();
const pool = require('../shared/pool');
const checkToken = require('../shared/checkToken');

orders.post('/add', checkToken, async (req, res) => {
    try {
        let userName = req.body.userName;
        let email = req.body.userEmail;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let pin = req.body.pin;
        let total = req.body.total;
        let orderDetails = req.body.orderDetails;

        console.log('orderDetails');
        console.log(email);
        pool.query(`select id from users where email='${email}'`, (err, user) => {
            if (err) {
                console.log(err);
                res.send({error: err.code, message: err.message});
            } else {
                console.log(user);
                if (user.length > 0) {
                    let userId = user[0].id;

                    const query =
                        `insert into orders (userId, userName, address, city, state, pin, total, email)
                        values (${userId},'${userName}','${address}','${city}','${state}','${pin}',${total},'${email}');   
                        select last_insert_id() as id`;

                    pool.query(query, (err, result) => {
                        if (err) {
                            res.send({error: err.code, message: err.message});
                        } else {
                            let orderId = result[1][0].id;
                            orderDetails.forEach(order => {
                                const detailsQuery =
                                    `insert into orderDetails (orderId, productId, qty, price, amount)
                                    values (${orderId},${order.productId},${order.qty},${order.price},${order.amount})`;

                                console.log(detailsQuery);

                                pool.query(detailsQuery, (detErr, detResult) => {
                                    if (detErr) {
                                        console.log('details insert error');
                                        res.send({error: detErr.code, message: detErr.message});
                                    } else {
                                        console.log('details inserted!');
                                    }
                                })
                            })

                            res.status(201).send({message: 'success'});
                        }
                    })
                } else {
                    res.status(401).send({error: 401, message: 'user doesnt exist'});
                }
            }
        })
    } catch (err) {
        res.status(400).send({
            error: err.code,
            message: err.message
        })
    }
})

orders.get('/allorders', checkToken, async (req, res) => {
    try {
        let userEmail = req.query.userEmail;
        pool.query(`select id from users where email='${userEmail}'`, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send({error: err.code, message: err.message});
            } else {
                if (user.length > 0) {
                    let userId = user[0].id;
                    pool.query(`select orderId,DATE_FORMAT(orderDate,'%m/%d/%Y') as orderDate,userName,address,city,state,pin,total from orders where userId=${userId}`,
                        (err, orders) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send({error: err.code, message: err.message});
                        } else {
                            const allOrders = [];
                            orders.forEach(order => {
                                allOrders.push({
                                    orderId: order.orderId,
                                    userName: order.userName,
                                    address: order.address,
                                    city: order.city,
                                    state: order.state,
                                    pin: order.pin,
                                    total: order.total,
                                    orderDate: order.orderDate,
                                });
                            });
                            res.status(200).send(allOrders);
                        }
                    })
                }
            }
        })
    } catch (e) {
        res.status(400).send({error: e, message: 'Unauthorized ...'});
    }
})

orders.get('/orderproducts', checkToken, async (req, res) => {
    try {
        let orderId = req.query.orderId;
        pool.query(`select orderDetails.*,products.product_name, products.product_img from orderDetails,products
                                            where orderDetails.productId=products.id and orderDetails.orderId=${orderId}`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({error: err.code, message: err.message});
                } else {
                   let orderDetails = [];
                    result.forEach(orderProduct => {
                       orderDetails.push({
                           productId: orderProduct.productId,
                           productName: orderProduct.product_name,
                           qty: orderProduct.qty,
                           price: orderProduct.price,
                           amount: orderProduct.amount,
                           productImage: orderProduct.product_img,
                       });
                   });
                   res.status(200).send(orderDetails);
                }
            }
        )
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e.code, message: e.message});
    }
})

module.exports = orders;