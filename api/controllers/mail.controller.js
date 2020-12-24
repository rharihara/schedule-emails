'use strict';


var mongoose = require('mongoose'),
  Mails = mongoose.model('Mails');

exports.list_all_schedule = function(req, res) {
  Mails.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};




exports.create_a_schedule = function(req, res) {
  var new_data = new Mails(req.body);
  new_data.save(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.read_a_schedule = function(req, res) {
  Mails.findById(req.params.scheduleId, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.update_a_schedule = function(req, res) {
  Mails.findOneAndUpdate({_id: req.params.scheduleId}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.delete_a_schedule = function(req, res) {


  Mails.remove({
    _id: req.params.scheduleId
  }, function(err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Schedule successfully deleted' });
  });
};
