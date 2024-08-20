const express=require('express')

const addOrder=require('../controller/order').addOrder
const getOrders=require('../controller/order').getOrders
const route=express.Router();
route.post("/addOrder", addOrder);

route.get("/getOrders", getOrders);

module.exports = route;