const express = require('express');
const productCategories = require("./routes/productCategories");
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const app = express();
const PORT = 5011;
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.use('/productCategories', productCategories);
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);

const server = app.listen(PORT, () => {
    console.log('Express server started on 5011');
});