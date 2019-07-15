// const mongoose = require('mongoose');
const Shops = require('./Shops');
const fs = require('fs');
const path = require('path');

const db = {}

db['shops'] = Shops;

module.exports =  db;