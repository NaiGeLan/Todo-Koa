const { createUser, getUserInfo,updateById } = require("../service/user.service");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config.default')
class UserController {
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body;
    try {
       // 2. 操作数据库
      const res = await createUser(user_name, password);
      // console.log(res)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.status = 500
      ctx.body = {
        code: "10003",
        message: "用户注册错误",
        result: "",
      };
    }
  }
  async login(ctx, next) {
    const {user_name} = ctx.request.body
    //获取用户信息（token的payload中要记录id，user_name，is_admin）
    try {
      // 从返回对象结果中剔除password属性，其他属性放在res对象
      const {password,...res} = await getUserInfo({user_name})
      ctx.body = {
        code: 0,
        message:'用户登录成功',
        result:{
          token: jwt.sign(res,JWT_SECRET,{expiresIn:'1d'})
        }
      } 
    }catch(err){
      console.error('用户登录失败');
    }
  }
  async changePassword(ctx,next){
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    console.log(id,password);
    const res = await updateById({id,password})
    if(res>0){
      ctx.body = {
        code: '0',
        message: '修改密码成功',
        result: ''
      }
    }else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败',
        result: ''
      }
    }
  }
}

module.exports = new UserController();
