'use strict';
module.exports = function(app) {
  var schedule = require('../controllers/mail.controller');

  // todoList Routes
  app.route('/schedule')
    .get(schedule.list_all_schedule)
    .post(schedule.create_a_schedule);


  app.route('/schedule/:scheduleId')
    .get(schedule.read_a_schedule)
    .put(schedule.update_a_schedule)
    .delete(schedule.delete_a_schedule);
};