const { Router } = require('express');
const listControllers = require('../controllers/listController');
const listRouter = Router();

listRouter.get('/all', listControllers.getAllList);
listRouter.get('/:id', listControllers.getList);
listRouter.post('/', listControllers.postList);
listRouter.patch('/add', listControllers.editList);
listRouter.patch('/edit', listControllers.changeNameList);
listRouter.delete('/:id', listControllers.deleteList);

module.exports = listRouter;