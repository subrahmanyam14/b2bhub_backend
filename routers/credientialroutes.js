const express=require('express')

const login=require('../controller/credientials').login
const register=require('../controller/credientials').register
const route=express.Router();
route.post("/login", login);

route.post("/register", register);

module.exports = route;
