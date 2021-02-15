const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    sendersName : {
        type : String,
        required: true
    },
    recieversName : {
        type : String,
        required: true
    },
    amount : {
        type : Number,
        required: true
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;