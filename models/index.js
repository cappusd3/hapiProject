// const mongoose = require('mongoose');
const Shops = require('./Shops');
const Goods = require('./Goods');
const Users = require('./Users');

const fs = require('fs');
const path = require('path');

const db = {}

db['shops'] = Shops;
db['goods'] = Goods;
db['users'] = Users;

module.exports =  db;