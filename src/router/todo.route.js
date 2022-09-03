const Router = require('koa-router')
const { searchTodo, addTodo } = require('../controller/todo.controller')

const router = new Router({prefix:'/todo'});
router.get('/search',searchTodo)
router.post('/add',addTodo)
module.exports = router;
