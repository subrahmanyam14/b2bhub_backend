const express=require('express')

const addProduct=require('../controller/seller').addProduct
const getProducts=require('../controller/seller').getProducts
const route=express.Router();
route.post("/addproducts", addProduct);

route.get("/getproducts", getProducts);

module.exports = route;