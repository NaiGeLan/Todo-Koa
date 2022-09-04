const Router = require('koa-router')
const { searchTodo, addTodo, editTodo ,deletTodo} = require('../controller/todo.controller')
const {auth} = require('../middleware/auth.middleware')
const router = new Router({prefix:'/todo'});
router.get('/search',auth,searchTodo)
router.post('/add',auth,addTodo)
router.patch('/edit',auth,editTodo)
router.delete('/delete',auth,deletTodo)
module.exports = router;
