const { findTodos, createTodo, updateTodo, destroyTodos } = require("../service/todo.service");
class TodoController {
    //查询Todo
    async searchTodo(ctx){
        const { todo_name } = ctx.request.query;
        const user_id = ctx.state.user.id;
        console.log(todo_name,user_id)
        try {
            const res = await findTodos( user_id, todo_name);
            ctx.body = {
                code:0,
                message:'查询成功',
                result:res
            };
        }catch(err){
            console.log(err)
            ctx.status = 500
            ctx.body = {
                code: 10001,
                message:'查询错误',
                result:err
            }
        }
       
    }
    //新增Todo
    async addTodo(ctx){
        console.log(ctx.request.body)
        const user_id = ctx.state.user.id
        const {todo_name} = ctx.request.body
        console.log( user_id );
        try {
            const res = await createTodo(user_id,todo_name)
            ctx.body = {
                code:0,
                message:'新增成功',
                result: {
                    id: res.id,
                    todo_name: res.todo_name,
                    is_complete: res.is_complete
                }
            }
        }catch(err) {
            console.log(err)
            ctx.status = 500
            ctx.body = {
                code: 10002,
                message:'新增错误',
                result:err
            }
        }
       
    }
    //编辑Todo
    async editTodo(ctx){
        const {todo_name,is_complete} = ctx.request.body
        const id = ctx.request.body.id
        const params = {todo_name,is_complete} 
        try {
            const res = await updateTodo(id,params)
            ctx.body = {
                code:0,
                message:'编辑成功',
                result:res
            }
        }catch(err) {
            ctx.body = {
                code: 10003,
                message:'新增错误',
                result:err
            }
        }
        
    }
    //删除Todo
    async deletTodo(ctx){
        console.log(ctx.request.query);
        const id = ctx.request.query.id
        console.log(id);
        try {
            const res = await destroyTodos(id)
            ctx.body = {
                code:0,
                message:'删除成功',
                result:res
            }
        }catch(err){
            ctx.body = {
                code: 10004,
                message:'删除错误',
                result:err
            }
        }
        
    }
}
module.exports = new TodoController()
