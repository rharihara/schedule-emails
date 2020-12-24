'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MailSchema = new Schema({
    from: {
    type: String,
    required: 'Kindly enter the from address'
  },
  to: {
    type: String,
    required: 'Kindly enter the to address'
  },
  subject: {
    type: String,
    required: 'Kindly enter the subject'
  },
  text: {
    type: String,
    required: 'Kindly enter the content of mail'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
      type:Boolean,
      default:true
  }
});

module.exports = mongoose.model('Mails', MailSchema);