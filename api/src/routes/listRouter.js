const { Router } = require('express');
const listControllers = require('../controllers/listController');
const listRouter = Router();

listRouter.get('/:id', listControllers.getList);
listRouter.post('/', listControllers.postList);
listRouter.patch('/add', listControllers.editList);
listRouter.delete('/:id', listControllers.deleteList);

module.exports = listRouter;