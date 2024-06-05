// models/Formdata.js
const mongoose = require('mongoose');

const formdataSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  district: String,
  tahsil: String,
  village: String,
  pincode: Number,
  area: Number,
  date:{
    type: String,
    required: true
  },
  coordinates:[]
});
const Formdata = mongoose.model('formdata', formdataSchema);
module.exports = Formdata;
