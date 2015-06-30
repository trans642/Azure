var mongoose = require('mongoose'),
  task = require('../models/task.js');

module.exports = TaskList;

function TaskList(connection) {
  mongoose.connect(connection);
}

TaskList.prototype = {
  showTasks: function(req, res) {
    res.render('index', { title: 'My ToDo List2', tasks: [] });
    /*
    task.find({ itemCompleted : false }, function foundTasks(err, items) {
        res.render('index', { title: 'My ToDo List', tasks: items });
    });
    */
  },

  addTask: function(req,res) {
    var item = req.body;
    var newTask = new task();
    newTask.itemName = item.itemName;
    newTask.itemCategory = item.itemCategory;
    newTask.save(function savedTask(err) {
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  },

  completeTask: function(req,res) {
    var completedTasks = req.body;
	var fnCallback = function updatedTask(err) {
			          if(err) {
			            throw err;
			          }
			        };
    for(var taskId in completedTasks) {
      if(completedTasks[taskId]=='true') {
        var conditions = { _id: taskId };
        var updates = { itemCompleted: completedTasks[taskId] };
        task.update(conditions, updates, fnCallback);
      }
    }
    res.redirect('/');
  }
}