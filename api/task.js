const moment = require('moment');

module.exports = app => {
  const getTasks = (req, res) => {
    const date = req.query.date ? req.query.date 
                 : moment().endOf('day').toDate();

    app.db('tasks')
      .where({ userId: req.user.id })
      .where('estimatedDate', '<=', date)
      .orderBy('estimatedDate')
      .then(tasks => res.json(tasks))
      .catch(error => res.status(500).json(error));
  }

  const save = (req, res) => {
    if (!req.body.desc.trim()) {
      return res.status(400).send('Não há descricão');
    }

    req.body.userId = req.user.id;

    app.db('tasks')
      .insert(req.body)
      .then(() => res.status(204).send('Salvo!'))
      .catch((error) => {
        res.status(500).json(error);
      });
  }

  const remove = (req, res) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .del()
      .then(rowsDeleted => {
        if (rowsDeleted === 1) {
          res.status(204).send('Deletado!');
        }
        const msg = `Id ${req.params.id} não encontrado!`
        res.status(400).send(msg);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
  }

  const updateTaskDoneDate = (req, res, doneDate) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .update({ doneDate })
      .then(() => res.status(204).send('Updated!'))
      .catch((error) => res.status(500).json(error));
  }

  const toggleDoneTask = (req, res) => {
    app.db('tasks')
      .where({id: req.params.id, userId: req.user.id})
      .first()
      .then(task => {
        if (!task) {
          const msg = `Id ${req.params.id} não encontrado!`
          res.status(400).send(msg);
        }

        const doneDate = task.doneDate ? null : new Date();
        
        updateTaskDoneDate(req, res, doneDate);
      })
      .catch((error) => res.status(500).json(error));
  }


  return { getTasks, save, remove, toggleDoneTask }
}