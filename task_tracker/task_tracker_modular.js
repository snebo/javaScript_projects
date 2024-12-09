/***
 * Task Tracker
 *
 * - Add a task
 * - Remove a task
 * - List all tasks
 * - Mark a task as complete
 *
 * This should use only objects and make sure that the code is modular, efficients, KISS, DRY and non dependent
 */

var Task = (function () {
	var task = [];

	//cache dom
	var $taskContainer = $('#tasks_list');
	var $template = $('#task_template').html();
	var el = $('#task_module');
	var $ul = el.find('ul');
	var $input = $('#input_box');
	var $button = $('#add_task_btn');

	//bind events
	$button.on('click', addTask);
	$ul.delegate('.del', 'click', deleteTask);
	function render() {
		var data = { task: task };
		const rendered = Mustache.render($template, data);
		$taskContainer.html(rendered);
	}
	function addTask(value) {
		var name = typeof value === 'string' ? value : $input.val();
		task.push(name);
		$input.val('');
		render();
	}
	function deleteTask(event) {
		if (typeof event === 'number') {
			var index = event;
		} else {
			var remove = $(event.target).closest('li');
			var index = $ul.find('li').index(remove);
		}
		task.splice(index, 1);
		render();
	}

	return {
		addTask: addTask,
		deleteTask: deleteTask,
	};
})();

// modular approach. works, but exposes more thean it has to
// var task = {
// 	task: [],
// 	init: function () {
// 		console.log('Task Tracker');
// 		this.cacheDom();
// 		this.render();
// 		this.bindEvents();
// 	},
// 	cacheDom: function () {
// 		this.$taskContainer = $('#tasks_list');
// 		this.$template = $('#task_template').html();
// 		this.el = $('#task_module');
// 		this.$ul = this.el.find('ul');
// 		this.$input = $('#input_box');
// 		this.$button = $('#add_task_btn');
// 	},
// 	render: function () {
// 		var data = { task: this.task };
// 		const rendered = Mustache.render(this.$template, data);
// 		this.$taskContainer.html(rendered);
// 	},
// 	addTask: function (value) {
// 		this.task.push(value || this.$input.val());
// 		this.$input.val('');
// 		this.render();
// 	},
// 	deleteTask(event) {
// 		var remove = $(event.target).closest('li');
// 		var index = this.$ul.find('li').index(remove);
// 		this.task.splice(index, 1);
// 		this.render();
// 	},
// 	bindEvents: function () {
// 		this.$button.on('click', this.addTask.bind(this));
// 		this.$ul.delegate('.del', 'click', this.deleteTask.bind(this));
// 	},
// };

// document.addEventListener('DOMContentLoaded', function () {
// 	task.init();
// });