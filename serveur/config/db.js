var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testbsweb');
module.exports = mongoose;