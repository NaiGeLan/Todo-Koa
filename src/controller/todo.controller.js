const { findTodos, createTodo } = require("../service/todo.service");
class TodoController {
    async searchTodo(ctx){
        console.log(ctx.request.body)
        const { user_name, password } = ctx.request.body;
        // console.log({ user_name, password })
        const res = await findTodos( user_name, password );
        ctx.body = res;
    }
    async addTodo(ctx){
        console.log('1111');
        console.log(ctx.request)
        const res = await createTodo()
        ctx.body = res
    }
}
module.exports = new TodoController()
