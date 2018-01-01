var mongoose = require('mongoose');

// Setup to use promise instead of callback
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
