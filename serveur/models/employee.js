var mongoose = require('../config/db');
var ArticleSchema = mongoose.Schema({
    Name: String,
    JobTitle: String,
    Age: Number,
    NickName: String,
    Year: String,
	Photo: String,
    Employee:Boolean,
});
module.exports = mongoose.model('Article', ArticleSchema);