module.exports = app => {
  app.post('/user/save', app.api.user.save);

  app.post('/auth/signin', app.api.auth.signin);

  app.get('/task/save', app.api.task.save);
  app.get('/task/get-tasks', app.api.task.getTasks);
  app.get('/task/remove', app.api.task.remove);
  app.get('/task/toggle-done-task', app.api.task.toggleDoneTask);

}