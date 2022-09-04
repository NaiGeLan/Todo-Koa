const Todos = require('../model/todo.model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class todoService {
    async findTodos(user_id, todo_name ){
        if(todo_name){
            const res = await Todos.findAll({
                order: [
                    ['createdAt','DESC']
                ],
                where: {
                    user_id: user_id,
                    todo_name: {
                        [Op.like]:'%' + todo_name + '%'
                    }
                },
                attributes:['id','todo_name','is_complete']
            })
            console.log(res.dataValues);
            return res
        }else {
            const res = await Todos.findAll({
                order: [
                    ['createdAt','DESC']
                ],
                where: {
                    user_id: user_id,
                },
                attributes:['id','todo_name','is_complete']
            })
            return res
        }
        
    }
    async createTodo(user_id, todo_name ){
        const res = await Todos.create({
            user_id,
            todo_name
        })
        console.log(res);
        return res.dataValues
    }
    async updateTodo(id, params){
        const res = await Todos.update(params,{where: {id}})
        return res>0? true : false
    }
    async destroyTodos(id){
        const res = await Todos.destroy({
            where: {
                id: id
            }
        })
        return res>0? true : false
    }
}
module.exports = new todoService()
