const {DataTypes} = require('sequelize')
const seq = require('../db/seq')
const User = require('./user.model')

const Todos = seq.define('zd_todos',{
    id: {
        type: DataTypes.BIGINT,
        field: 'id',
        primaryKey: true,
        autoIncrement: true
    },
    todo_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        comment: '任务名',
    },
    is_complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
        comment: '是否已经完成',
        defaultValue: 0,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        comment: '用户ID',
    }
})
Todos.belongsTo(User,{
    foreignKey: 'user_id',
    as: 'todo_info'
})
//  Todos.sync({ force: true });
// console.log("用户模型表刚刚(重新)创建！");
module.exports = Todos