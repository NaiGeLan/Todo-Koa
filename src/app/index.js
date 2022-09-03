const Koa = require('koa')
const koaBody = require('koa-body')
const app = new Koa()

const userRouter = require('../router/user.route')
const todoRouter = require('../router/todo.route')
app.use(koaBody())

app.use(todoRouter.routes()).use(userRouter.routes())


module.exports = app
