var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;


var searchHistorySchema   = new Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    bookings:{}
});

module.exports = mongoose.model('searchhistory', searchHistorySchema,'searchhistory');
