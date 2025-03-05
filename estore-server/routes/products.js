const express = require('express');
const products = express.Router();
const pool = require('../shared/pool')

products.get('/', (req, res) => {
    let mainCategoryId = req.query.mainCategoryId;
    let subcategoryId = req.query.subcategoryId;
    let keyword = req.query.keyword;

    let query = 'Select * from products';
    if (subcategoryId) {
        query += ' where category_id = ' + subcategoryId;
    }
    if (mainCategoryId) {
        query = 'select products.* from products, categories where products.category_id = categories.id and categories.parent_category_id = '
            + mainCategoryId;
    }
    if (keyword) {
        query += ` and keywords like '%${keyword}%'`;
    }

    pool.query(query, (err, products) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(products);
        }
    })
})

products.get('/:id', (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * FROM products where id=' + id, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(product);
        }
    })
})

module.exports = products;